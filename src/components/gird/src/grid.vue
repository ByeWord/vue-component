<template>
    <div class="w-grid">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WGrid",
    props: {
      colNum: { //列数
        type: Number | String,
        default: 3
      },
      showBorder: {
        type: Boolean,
        default: false
      },
      showVerticalBorder: {
        type: Boolean,
        default: false
      },
      showHorizontalBorder: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.updateChildren();
    },
    methods: {
      updateChildren() {
        const children = this.$children;
        let colNum = Number(this.colNum);
        if (children.length < colNum) {
          colNum = children.length;
        }
        const itemWidth = 100 / colNum;
        children.forEach(child => {
          child.itemWidth = itemWidth;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-grid {
        display: flex;
        flex-wrap: wrap;
        position: relative;
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
            border-top: 1px solid black;
            border-left: 1px solid black;
        }
    }
</style>