<template>
    <div ref="viewBox" class="w-scroll-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
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
    props: {},
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
    methods: {
      updateScrollBar(translateY, contentHeight, viewHeight, trackHeight) {
        this.scrollBarHeight = viewHeight * trackHeight / contentHeight;
        this.scrollBarTranslate.y = -translateY * trackHeight / contentHeight;
      },
      onMouseDownScrollBar(e) {
        this.scrollBarMoving = true;
        this.scrollBarStartPos = {x: e.pageX, y: e.pageY};
        document.addEventListener('mousemove', this.onMouseMoveScrollBar);
        document.addEventListener('mouseup', this.onMouseUpScrollBar);
      },
      onMouseMoveScrollBar(e) {
        if (this.scrollBarMoving) {
          let end = {x: e.pageX, y: e.pageY};
          let deltaY = end.y - this.scrollBarStartPos.y;
          this.scrollBarStartPos = end;
          this.scrollBarTranslate.y = this.scrollBarTranslate.y + deltaY;
          if (this.scrollBarTranslate.y <= 0) {
            this.scrollBarTranslate.y = 0;
          } else if (this.scrollBarTranslate.y >= (this.trackHeight - this.scrollBarHeight)) {
            this.scrollBarTranslate.y = this.trackHeight - this.scrollBarHeight;
          }
          this.contentTranslateY = -this.contentHeight * this.scrollBarTranslate.y / this.visibleHeight;
        }
      },
      onMouseUpScrollBar(e) {
        this.scrollBarMoving = false;
        document.removeEventListener('mouseup', this.onMouseUpScrollBar);
        document.removeEventListener('mousemove', this.onMouseMoveScrollBar);
      },
      onMouseEnter() {
        this.scrollBarVisible = true;
      },
      onMouseLeave() {
        this.scrollBarVisible = false;
      }
    },
    mounted() {

      let viewBoxEl = this.$refs.viewBox;
      let contentEl = this.$refs.content;

      this.contentHeight = contentEl.offsetHeight;

      this.trackHeight = viewBoxEl.clientHeight;

      this.visibleHeight = calVisibleHeight(viewBoxEl);

      let minTranslate = 0;

      let maxTranslate = this.contentHeight - this.visibleHeight;

      let step = 100;

      this.updateScrollBar(this.contentTranslateY, this.contentHeight, this.visibleHeight, this.trackHeight);

      viewBoxEl.addEventListener('wheel', (event) => {
        let direction = event.deltaY;
        if (direction > 0) {
          this.contentTranslateY -= step;
          if (this.contentTranslateY <= -maxTranslate) {
            this.contentTranslateY = -maxTranslate;
          }
        } else if (direction < 0) {
          this.contentTranslateY += step;
          if (this.contentTranslateY >= minTranslate) {
            this.contentTranslateY = minTranslate;
          }
        }

        if (minTranslate < Math.abs(this.contentTranslateY) && Math.abs(this.contentTranslateY) < maxTranslate) {
          event.preventDefault();
        }
        this.updateScrollBar(this.contentTranslateY, this.contentHeight, this.visibleHeight, this.trackHeight);
      });
    }
  }
</script>

<style lang="scss" scoped>
    .w-scroll {
        box-sizing: border-box;
        transition: transform .05s ease-in-out;
        overflow: hidden; //触发BFC
        &-wrapper {
            height: 500px;
            width: 400px;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            border: 10px solid crimson;
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