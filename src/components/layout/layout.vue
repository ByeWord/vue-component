<template>
    <div class="w-layout" :class="{'w-layout-has-side':layoutClass}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "w-layout",
    data() {
      return {
        layoutClass: false
      }
    },
    mounted() {
      this.$children.forEach(vm => {
        if (vm.$options.name === 'w-sider') {
          this.layoutClass = true;
        }
      })
    }
  }
</script>

<style scoped lang="scss">
    .w-layout {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

    }
    .w-layout-has-side {
        flex-direction: row;
    }
</style>