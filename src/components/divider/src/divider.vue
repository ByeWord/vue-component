<template>
    <div :class="['w-divider',directionClass]">
        <div :class="['w-divider-content',positionClass]">
        </div>
    </div>
</template>

<script>
  export default {
    name: "WDivider",
    props: {
      contentPosition: {
        type: String,
        default: 'center',
        validator: (v) => ['left', 'right', 'center'].indexOf(v.toLowerCase()) >= 0
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator: (v) => ['vertical', 'horizontal'].indexOf(v) >= 0
      }
    },
    computed: {
      positionClass() {
        return `w-divider-content-${this.contentPosition}`
      }
      ,
      directionClass() {
        return `w-divider-${this.direction}`
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-divider {
        display: inline-block;
        position: relative;
        background-color: #cccccc;
        &.w-divider-vertical {
            height: 1em;
            width: 1px;
            margin: 0 8px;
            vertical-align: middle;
            .w-divider-content {
                padding: 20px 0;
                background-color: #fff;
                position: absolute;
                &-left {
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                &-center {
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                &-right {
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
        &.w-divider-horizontal {
            height: 1px;
            width: 100%;
            margin: 20px auto;
            .w-divider-content {
                padding: 0 20px;
                background-color: #fff;
                position: absolute;
                &-left {
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                &-center {
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                &-right {
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
</style>