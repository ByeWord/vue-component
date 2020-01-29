<template>
    <button class="w-button"
            :class="[
              type ? 'el-button--' + type : '',
              buttonSize ? 'el-button--' + buttonSize : '',
              {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle
              }
    ]"
    :type="nativeType"
    >
        <w-icon v-if="icon" :name="icon"></w-icon>
        <span v-if="$slots.default"><slot></slot></span>
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
      nativeType:{
        type:String,
        default: 'button'
      },
      buttonDisabled: Boolean,
      loading: Boolean,
      plain: Boolean,
      round: Boolean,
      circle: Boolean
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/var";
    .w-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: $button-height;
        border: $button-border;
        background-color: $button-bgc;
        padding: 0 15px;
        border-radius: $button-border-radius;
        transition: all 0.2s ease-in-out;
        &:hover {
            border-color: $button-hover-border-color;
            background-color: $button-hover-bgc;
        }
        //type
        &--success{

        }
        &--warning{

        }
        &--primary{

        }
        // size
        &--small {
            height: $button-small-height;
        }
        &--min {
            height: $button-min-height;
            font-size: $button-min-font-size;
            padding: 0 8px;
        }
        //state
        &.is-disabled{

        }
        &.is-loading{

        }
        &.is-plain{

        }
        &.is-round{

        }
        &.is-circle{

        }
    }
</style>