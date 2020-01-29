<template>
    <div class="w-input">
        <input
                class="w-input-inner"
                :type="type"
                :readonly="readonly"
                :disabled="disabled"
                :value="value"
                @input="$emit('input',$event.target.value)"
                @focus="$emit('focus',$event)"
                @blur="$emit('blur',$event)"
        >
        <template v-if="error">
            <w-icon name="information" class="icon-error"></w-icon>
            <span class="error-info">{{error}}</span>
        </template>
    </div>
</template>

<script>
  import WIcon from '../../icon/src/icon';

  export default {
    name: "WInput",
    components: {
      WIcon
    },
    props: {
      type: {
        type: String,
        default: "text"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      value: {
        type: String
      },
      error: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
    $input-font-size: 12px;
    $input-border-color: #999;
    $input-border-color-hover: #666;
    $input-box-shadow-color: rgba(0, 0, 0, 0.5);
    $red: #F1453D;
    .w-input {
        font-size: $input-font-size;
        display: inline-flex;
        align-items: center;
        > :not(:last-child) {
            margin-right: 0.5em;
        }
        &-inner {
            cursor: pointer;
            border: 1px solid $input-border-color;
            font-size: inherit;
            border-radius: 4px;
            padding: 0 8px;
            height: 32px;
            &:hover {
                border-color: $input-border-color-hover;
            }
            &:focus {
                box-shadow: inset 0 0 3px $input-box-shadow-color;
            }
            &[disabled], &[readonly] {
                background-color: #f5f7fa;
                border-color: #e4e7ed;
                color: #c0c4cc;
                cursor: not-allowed;
                &:focus {
                    box-shadow: none;
                }
            }
        }
        .icon-error {
            fill: $red;
        }
        .error-info {
            color: $red;
            font-size: 12px;
        }
    }
</style>