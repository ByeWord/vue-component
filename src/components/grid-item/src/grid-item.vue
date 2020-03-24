<template>
    <div class="w-grid-item" :class="classes" :style="itemStyle">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WGridItem",
    data() {
      return {
        itemWidth: 33.33,
        showBorder: true,
        showVerticalBorder: false,
        showHorizontalBorder: false,
        shouldML: false
      }
    },
    computed: {
      itemStyle() {
        return {width: `${this.itemWidth}%`}
      },
      classes() {
        const classes = [];
        if (this.showBorder) {
          classes.push('w-grid-item-show-border');
        }
        if (this.showVerticalBorder) {
          classes.push('w-grid-item-show-border-vertical');
        }
        if (this.showVerticalBorder) {
          classes.push('w-grid-item-show-border-horizontal');
        }
        if (this.shouldML) {
          classes.push()
        }
        return classes;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-grid-item {
        position: relative;
        &-show-border {
            &::after {
                position: absolute;
                box-sizing: border-box;
                content: '';
                pointer-events: none;
                top: -50%;
                right: -50%;
                bottom: -50%;
                left: -50%;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                border-right: 1px solid black;
                border-bottom: 1px solid black;
            }
        }
    }
</style>