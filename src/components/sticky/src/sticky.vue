<template>
    <div class="w-sticky-wrapper" ref="wrapper" :style="{height}">
        <div class="w-sticky" :class="{sticky}" :style="{left,width}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "WSticky",
    props: {
      distance: {
        type: Number | String,
        default: 0
      }
    },
    data() {
      return {
        sticky: false,
        left: undefined,
        height: undefined,
        width: undefined
      }
    },
    mounted() {
      //1.
      //2. stickyEl position:fixed定位后，页面刚好承载内容导致滚动条消失
      /**
       * 解决思路：html结构 wrapper->sticky
       * sticky变成fixed后设置wrapper的高度为原先的高度
       */
      //3. 如果加载的是图片资源，获取到的wrapper高度不准确
      /**
       *监听sticky->true变化时再获取高度
       */
        //4.宽度和位置由于position：fixed后变得不准确
      /**
       * 解决思路同上
       */
      let top = this.top();
      window.addEventListener('scroll', () => {
        if (window.scrollY > top) {
          let {left, width, height} = this.$refs.wrapper.getBoundingClientRect();
          this.left = left + 'px';
          this.height = height + 'px';
          this.width = width + 'px';
          this.sticky = true;
        } else {
          this.sticky = false;
        }
      });
    },
    methods: {
      top() {
        // top的值有正负
        let {top} = this.$refs.wrapper.getBoundingClientRect();
        return top + window.scrollY;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-sticky {
        &.sticky {
            position: fixed;
            top: 0;
        }
    }
</style>