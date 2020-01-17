<template>
    <div ref="viewBox" class="w-scroll-wrapper">
        <div ref="content" class="w-scroll">
            <slot></slot>
        </div>
        <div class="w-scroll-track">
            <div class="w-scroll-bar" ref="bar" :style="{height:scrollBarHeight+'px'}">
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
        scrollBarHeight: 0
      }
    },
    methods: {
      initScrollBar(contentHeight, viewHeight) {
        this.scrollBarHeight = viewHeight * viewHeight / contentHeight;
      },
      updateScrollBar(translateY, contentHeight, viewHeight) {

        let bar = this.$refs.bar;
        let barTranslate = translateY * viewHeight / contentHeight;
        bar.style.transform = `translateY(${-barTranslate}px)`;
      },
    },
    mounted() {

      let viewBoxEl = this.$refs.viewBox;
      let contentEl = this.$refs.content;

      let childHeight = contentEl.offsetHeight;
      let parentHeight = viewBoxEl.offsetHeight;

      let visibleHeight = calVisibleHeight(viewBoxEl);

      let minTranslate = 0;

      let maxTranslate = childHeight - visibleHeight;

      let translateY = 0;

      let step = 100;

      viewBoxEl.addEventListener('wheel', (event) => {
        let direction = event.deltaY;
        if (direction > 0) {
          translateY -= step;
          if (translateY <= -maxTranslate) {
            translateY = -maxTranslate;
          }
        } else if (direction < 0) {
          translateY += step;
          if (translateY >= minTranslate) {
            translateY = minTranslate;
          }
        }

        if (minTranslate < Math.abs(translateY) && Math.abs(translateY) < maxTranslate) {
          event.preventDefault();
        }
        contentEl.style.transform = `translateY(${translateY}px)`;
        this.updateScrollBar(translateY, childHeight, parentHeight);
      });

      this.initScrollBar(childHeight, parentHeight);
    }
  }
</script>

<style lang="scss" scoped>
    .w-scroll {
        box-sizing: border-box;
        transition: transform .2s ease-in-out;
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
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 7px;
        }
        &-bar {
            position: absolute;
            height: 40px;
            width: 8px;
            left: 50%;
            top: 0;
            margin-left: -4px;
            padding: 4px 0;
            &-inner {
                height: 100%;
                border-radius: 4px;
                background-color: rgba(0, 0, 0, .3);
                transition: background-color .3s ease-in-out;
                cursor: pointer;
                &:hover {
                    background-color: rgba(0, 0, 0, .6);
                }
            }
        }
    }

</style>