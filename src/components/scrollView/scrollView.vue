<template>
    <div ref="viewBox" class="w-scroll-wrapper"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave"
         @wheel="onWheel"
    >
        <div ref="content" class="w-scroll" :style="{transform:`translateY(${contentTranslateY}px)`}">
            <slot></slot>
        </div>
        <div class="w-scroll-track" ref="track" v-if="scrollBarVisible">
            <div class="w-scroll-bar" ref="bar"
                 :style="{height:scrollBarHeight+'px',transform:`translate3d(0px,${scrollBarTranslate.y}px,${scrollBarTranslate.z}px)`}"
                 @mousedown="onMouseDownScrollBar">
                <div class="w-scroll-bar-inner"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import {calVisibleHeight} from "../../utils/utils";

  export default {
    name: "w-scroll",
    props: {
      step: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        trackHeight: 0,
        scrollBarHeight: 0,
        scrollBarVisible: false,
        scrollBarStartPos: {},
        scrollBarMoving: false,
        scrollBarTranslate: {x: 0, y: 0, z: 1},
        contentTranslateY: 0,
        contentHeight: 0,
        visibleHeight: 0,
      }
    },
    computed: {
      contentMaxTranslateY() {
        return this.contentHeight - this.visibleHeight;
      },
      scrollBarMaxTranslateY() {
        return this.trackHeight - this.scrollBarHeight;
      }
    },
    methods: {
      listenToRemoteResources() {
        let tags = this.$refs.viewBox.querySelectorAll('img, video, audio');
        Array.from(tags).map((tag) => {
          if (tag.hasAttribute('data-listened')) {
            return
          }
          tag.setAttribute('data-listened', 'yes');
          tag.addEventListener('load', () => {
            this.init();
          })
        })
      },
      listenToDomChange() {
        const targetNode = this.$refs.content;
        const config = {attributes: true, childList: true, subtree: true};
        const callback = () => {
          this.listenToRemoteResources()
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
      },
      updateScrollBarHeight() {
        this.scrollBarHeight = this.visibleHeight * this.trackHeight / this.contentHeight;
      },
      updateScrollBar() {
        this.updateScrollBarHeight();
        this.scrollBarTranslate.y = -this.contentTranslateY * this.trackHeight / this.contentHeight;
      },
      updateContentTranslateYByMouse() {
        this.contentTranslateY = -this.contentHeight * this.scrollBarTranslate.y / this.visibleHeight;
      },
      onMouseDownScrollBar(e) {
        this.scrollBarMoving = true;
        this.scrollBarStartPos = {x: e.pageX, y: e.pageY};
        document.addEventListener('mousemove', this.onMouseMoveScrollBar);
        document.addEventListener('mouseup', this.onMouseUpScrollBar);
      },
      onMouseMoveScrollBar(e) {
        if (this.scrollBarMoving) {
          let deltaY = e.pageY - this.scrollBarStartPos.y;
          this.scrollBarStartPos = {x: e.pageX, y: e.pageY};

          let willScrollBarTranslate = this.scrollBarTranslate.y + deltaY;
          // 限制scroll bar移动距离
          if (willScrollBarTranslate <= 0) {
            this.scrollBarTranslate.y = 0;
          } else if (willScrollBarTranslate >= this.scrollBarMaxTranslateY) {
            this.scrollBarTranslate.y = this.scrollBarMaxTranslateY;
          } else {
            this.scrollBarTranslate.y = willScrollBarTranslate;
          }
          this.updateContentTranslateYByMouse();
        }
      },
      onMouseUpScrollBar(e) {
        this.scrollBarMoving = false;
        this.listenToDoc();
      },
      listenToDoc() {
        document.removeEventListener('mouseup', this.onMouseUpScrollBar);
        document.removeEventListener('mousemove', this.onMouseMoveScrollBar);
      },
      onMouseEnter() {
        this.scrollBarVisible = true;
      },
      onMouseLeave() {
        this.scrollBarVisible = false;
      },
      onWheel(event) {
        this.updateContentTranslateY(event);
        this.updateScrollBar();
      },
      updateContentTranslateY(event) {

        let direction = event.deltaY;

        // 限制内容滚动距离
        if (direction > 0) {
          this.contentTranslateY -= this.step;
          if (this.contentTranslateY <= -this.contentMaxTranslateY) {
            this.contentTranslateY = -this.contentMaxTranslateY;
          }
        } else if (direction < 0) {
          this.contentTranslateY += this.step;
          if (this.contentTranslateY >= 0) {
            this.contentTranslateY = 0;
          }
        }
        //解决内容滚动到
        let limit = Math.abs(-this.contentTranslateY);
        if (0 < limit && limit < this.contentMaxTranslateY) {
          event.preventDefault();
        }
      },
      init() {
        let viewBoxEl = this.$refs.viewBox;

        this.contentHeight = this.$refs.content.offsetHeight;

        this.trackHeight = viewBoxEl.clientHeight;

        this.visibleHeight = calVisibleHeight(viewBoxEl);

        this.updateScrollBar();

        this.listenToRemoteResources();

        this.listenToDomChange();
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
    .w-scroll {
        box-sizing: border-box;
        transition: transform .05s ease-in-out;
        overflow: hidden; //触发BFC
        &-wrapper {
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
        }
        &-track {
            position: absolute;
            width: 14px;
            height: 100%;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 7px;
            opacity: 0.5;
        }
        &-bar {
            position: absolute;
            width: 8px;
            left: 50%;
            top: 0;
            margin-left: -4px;
            padding: 4px 0;
            transition: transform .05s ease-in-out;
            box-sizing: border-box;
            &-inner {
                height: 100%;
                border-radius: 4px;
                background-color: rgba(0, 0, 0, .3);
                transition: background-color .3s ease-in-out;
                cursor: pointer;
                &:hover {
                    background-color: rgba(0, 0, 0, .8);
                }
            }
        }
    }

</style>