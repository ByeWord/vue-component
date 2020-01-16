<template>
    <div class="wrapper" :class="toastPosClass">
        <div class="w-toast" :class="[showClose?'is-closable':'']">
            <div v-if="dangerouslyUseHTMLString" class="w-toast-content" v-html="message"></div>
            <div v-else class="w-toast-content" v-html="message">
                {{message}}
            </div>
            <div class="w-toast-action" @click="close" v-if="showClose">
                {{closeButton.text}}
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "w-toast",
    props: {
      message: [String],
      autoClose: [Boolean],
      autoCloseDelay: {
        type: Number,
        default: 5
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeButton: {
        type: Object,
        default: () => ({
          text: "关闭", callback: () => {
            console.log('关闭toast')
          }
        })
      },
      dangerouslyUseHTMLString: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'left', 'right', 'middle'].indexOf(value) >= 0
        }
      }
    },
    mounted() {
      this.closeDelay();
    },
    methods: {
      close() {
        this.$el.remove();
        this.$emit('close');
        this.$destroy();
      },
      onClickClose() {
        this.closeButton.callback && this.closeButton.callback();
        this.close();
      },
      closeDelay() {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000)
      }
    },
    computed: {
      toastPosClass() {
        return [`wrapper-${this.position}`]
      }
    }
  }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, .75);
    $toast-font-size: 14px;
    $toast-font-color: #fff;
    $toast-shadow: 0 0 3px 0px rgba(0, 0, 0, .5);

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideLeft {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideRight {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .wrapper {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translate(-50%, 0);
        .w-toast {
            animation: slideUp 1s;

            background-color: $toast-bg;
            box-shadow: $toast-shadow;
            border-radius: 4px;

            font-size: $font-size;
            color: $toast-font-color;

            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 16px;
            min-width: 360px;
            box-sizing: border-box;

            .w-toast-content {
                flex: 1;
            }

            .w-toast-action {
                flex-shrink: 0;
                cursor: pointer;
                user-select: none;
            }
            &.is-closable {
                .w-toast-content {
                    padding-right: 16px;
                }
            }
        }
        &-top {
            top: 10px;
            left: 50%;
            transform: translate(-50%, 0);
            .w-toast {
                border-top-right-radius: 0;
                border-top-left-radius: 0;
                animation: slideDown 1s;
            }
        }

        &-left {
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            .w-toast {
                animation: slideRight 1s;
            }
        }
        &-right {
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            .w-toast {
                animation: slideLeft 1s;
            }
        }
        &-bottom {
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            .w-toast {
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                animation: slideUp 1s;
            }
        }
        &-middle {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>