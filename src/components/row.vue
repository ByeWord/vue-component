<template>
    <div class="w-row" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WRow",
    props: {
      type: String,
      gutter: [String, Number]
    },
    computed: {
      rowStyle() {
        let {gutter} = this;
        return !!gutter ? {marginLeft: `${-gutter / 2}px`, marginRight: `${-gutter / 2}px`} : ''
      }
    },
    mounted() {
      this.$children.forEach(child => {
        child.gutter = this.gutter
      })
    }
  }
</script>

<style lang="scss" scoped>
    .w-row {
        &::before, &::after {
            content: '';
            display: table;
        }
        &::after {
            clear: both;
        }
    }
</style>