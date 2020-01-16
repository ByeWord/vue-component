<template>
    <transition name="fade">
        <div class="w-sider" :class="{hide}" :style="[width&&{width:`${width}px`}]">
            <slot></slot>
            <button class="toggle-btn" @click="toggleSider">toggle</button>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "w-sider",
    props: {
      width: {
        type: String | Number,
        default: 200
      }
    },
    data() {
      return {
        hide: false
      }
    },
    methods: {
      toggleSider() {
        this.hide = !this.hide
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-sider {
        width: 200px;
        position: relative;
        &.hide {
            margin-left: -200px;
        }
        .toggle-btn {
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all 2s;
    }

    .fade-enter, .fade-leave-to {
        margin-left: -200px;
    }
</style>