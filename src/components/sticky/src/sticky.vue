<template>
    <div class="w-sticky-wrapper" ref="wrapper" :style="{height}">
        <div class="w-sticky" ref="stickyEl" :class="{sticky}" :style="{left,width,top}">
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
        width: undefined,
        top:undefined
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
      this.scrollHandler = () => {
        let top = this.offsetTop();
        console.log(top)
        console.log(Number(this.distance))
        if (top < Number(this.distance)) {
          let {left, width, height} = this.$refs.wrapper.getBoundingClientRect();
          this.left = left + 'px';
          this.height = height + 'px';
          this.width = width + 'px';
          this.top = this.distance + 'px';
          this.sticky = true;
        } else {
          console.log('不吸顶了')
          this.left = undefined;
          this.height = undefined;
          this.width = undefined;
          this.top = undefined;
          this.sticky = false;
        }
      };
      window.addEventListener('scroll', this.scrollHandler);
    },
    methods: {
      offsetTop() {
        // top的值有正负
        let {top} = this.$refs.wrapper.getBoundingClientRect();
        return top;
      }
    },
    //解除热更新副作用
    beforeDestroy(){
        window.removeEventListener('scroll',this.scrollHandler)
    }
  }
</script>

<style lang="scss" scoped>
    .w-sticky {
        &.sticky {
            position: fixed;
        }
    }
</style>