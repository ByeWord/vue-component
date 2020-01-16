<template>
    <div class="w-toast" :class="[showClose?'is-closable':'']">
        <div class="w-toast-content">
            {{message}}
        </div>
        <div class="w-toast-action" @click="close" v-if="showClose">
            {{closeButton.text}}
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
      }
    },
    mounted() {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000)
    },
    methods: {
      close() {
        this.$el.remove();
        this.$destroy();
      },
      onClickClose() {
        this.closeButton.callback && this.closeButton.callback();
        this.close();
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
    .w-toast {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translate(-50%, 0);

        background-color: $toast-bg;
        box-shadow: $toast-shadow;
        border-radius: 4px;

        font-size: $font-size;
        color: $toast-font-color;

        display: flex;
        align-items: center;

        padding: 16px;
        min-width: 360px;
        box-sizing: border-box;

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
</style>