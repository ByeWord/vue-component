<template>
    <transition name="slide">
        <div class="w-slide-item" v-if="visible" :class="{reverse}">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "WSlideItem",
    props: {
      name: {
        type: String | Number,
        required: true
      }
    },
    data() {
      return {
        selected: undefined,
        reverse: false
      }
    },
    computed: {
      visible() {
        return this.selected === this.name;
      }
    }
  }
</script>

<style lang="scss" scoped>

    .slide-leave-active {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 2s linear;
    }

    .slide-enter {
        transform: translateX(100%) scale(0.5);
        opacity: 0;
    }

    .slide-leave-to {
        transform: translateX(-100%) scale(0.5);
        opacity: 0;
    }

    .slide-leave-to.reverse {
        transform: translateX(100%) scale(0.5);
        opacity: 0;
    }

    .slide-enter.reverse {
        transform: translateX(-100%) scale(0.5);
        opacity: 0;
    }
    .slide-enter.vertical{
        transform: translateY(100%);
    }
    .slide-leave-to.vertical{
        transform: translateY(-100%);
    }
</style>