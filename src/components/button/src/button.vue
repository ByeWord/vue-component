<template>
    <button class="w-button"
            :class="[
              type ? 'w-button--' + type : '',
              buttonSize ? 'w-button--' + buttonSize : '',
              {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle
              }
    ]"
            :type="nativeType"
            @click="onClick"
    >
        <w-icon v-if="icon&&!loading" :name="icon"></w-icon>
        <w-icon v-if="loading" class="loading" name="loading"></w-icon>
        <span :class="{hasIcon:!!icon}" class="w-button-slot-wrapper" v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
  import WIcon from "../../icon/src/icon";

  export default {
    name: "WButton",
    components: {WIcon},
    props: {
      type: {
        type: String
      },
      icon: {
        type: String,
        default: ''
      },
      buttonSize: {
        type: String
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      buttonDisabled: Boolean,
      loading: Boolean,
      plain: Boolean,
      round: Boolean,
      circle: Boolean
    },
    methods: {
      onClick(evt) {
        if (this.buttonDisabled || this.loading) return;
        this.$emit('click', evt);
      }
    }
  }
</script>

<style lang="scss" scoped>
    //css技巧：默认样式排在前 互斥样式
    @import "../../../assets/css/var";

    .w-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: $button-border;
        background-color: $button-bgc;
        padding: 12px 20px;
        border-radius: $button-border-radius;
        transition: all 0.2s ease-in-out;
        position: relative;
        &:hover {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
        }
        //type
        &--success {
            color: #fff;
            background-color: #67c23a;
            border-color: #67c23a;
            &.is-plain {
                color: #67c23a;
                background: #f0f9eb;
                border-color: #c2e7b0;
                &:hover {
                    color: #fff;
                    background-color: #67c23a;
                    border-color: #67c23a;
                }
            }
            &:hover {
                background: #85ce61;
                border-color: #85ce61;
            }
        }
        &--warning {
            color: #fff;
            background-color: #e6a23c;
            border-color: #e6a23c;
            &.is-plain {
                color: #e6a23c;
                background: #fdf6ec;
                border-color: #f5dab1;
                &:hover {
                    color: #fff;
                    background-color: #e6a23c;
                    border-color: #e6a23c;
                }
            }
            &:hover {
                background: #ebb563;
                border-color: #ebb563;
            }
        }
        &--danger {
            color: #fff;
            background-color: #f56c6c;
            border-color: #f56c6c;
            &.is-plain {
                color: #f56c6c;
                background: #fef0f0;
                border-color: #fbc4c4;
                &:hover {
                    color: #fff;
                    background-color: #f56c6c;
                    border-color: #f56c6c;
                }
            }
            &:hover {
                background: #f78989;
                border-color: #f78989;
            }
        }
        &--primary {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            &.is-plain {
                color: #409eff;
                background: #ecf5ff;
                border-color: #b3d8ff;
                &:hover {
                    background-color: #409eff;
                    border-color: #409eff;
                    color: #fff;
                }
            }
            &:hover {
                background: #66b1ff;
                border-color: #66b1ff;
            }
        }
        // size
        &--small {
            padding: 6px 12px;
        }
        &--min {
            padding: 2px 12px;
            font-size: $button-min-font-size;
        }
        //state
        &.is-disabled {
            cursor: not-allowed;
            background-color: #fff;
            border-color: #ebeef5;
            color: #c0c4cc;
            &.w-button--primary {
                background: #ecf5ff;
                border-color: #c3ccd6;
            }
            &.w-button--success {
                background: #f0f9eb;
                border-color: #d0d9cb;
            }
            &.w-button--warning {
                background: #fdf6ec;
                border-color: #e1dad0;
            }
            &.w-button--danger {
                background: #fef0f0;
                border-color: #ddcfcf;
            }
        }
        &.is-loading {
            position: relative;
            pointer-events: none;
            &::before {
                pointer-events: none;
                content: "";
                position: absolute;
                left: -1px;
                top: -1px;
                right: -1px;
                bottom: -1px;
                border-radius: inherit;
                background-color: hsla(0, 0%, 100%, .35);
            }
        }
        &.is-round {
            border-radius: 20px;
            padding: 12px 23px;
        }
        &.is-circle {
            border-radius: 50%;
            padding: 12px;
        }
        .w-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            &.loading {
                animation: spin 2s infinite linear;
            }
        }
        .hasIcon {
            margin-left: 6px;
        }
        &-slot-wrapper {
            display: flex;
            align-items: center;
        }

    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>