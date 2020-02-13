<template>
    <label>
        <input
                v-if="withGroup"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="change"
                :checked="currentValue"
        />
        <input
                v-else
                type="checkbox"
                :disabled="disabled"
                @change="change"
                :checked="currentValue"
        />
        <slot></slot>
    </label>
</template>

<script>
  import {findComponentUpward} from "../../../utils/assits";

  export default {
    name: "WCheckbox",
    props: {
      value: {
        type: [Boolean, Number, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      trueValue: {
        type: [Boolean, Number, String],
        default: true
      },
      falseValue: {
        type: [Boolean, Number, String],
        default: false
      },
      label: {
        type: [Boolean, Number, String],
        default: ''
      }
    },
    data() {
      return {
        currentValue: this.value,
        withGroup: false,
        model: [],
        parent: null
      }
    },
    watch: {
      value(v) { // 由于定义props时无法使用props的字段，所以可以通过watch来校验手动修改value带来影响
        if (v === this.trueValue || v === this.falseValue) {
          this.updateModel();
        } else {
          throw new Error(`The value can only be the trueValue:${this.trueValue} or falseValue${this.falseValue},and you can define them with props.`)
        }
      }
    },
    mounted() {
      let parent = this.parent = findComponentUpward(this, 'WCheckboxGroup');
      if (parent) {
        this.withGroup = true;
      }
    },
    methods: {
      change(evt) {
        if (this.disabled) return false;
        const checked = evt.target.checked;
        this.currentValue = checked;
        const value = checked ? this.trueValue : this.falseValue;
        this.$emit('input', value);
        if (this.withGroup) {
          this.parent.change(this.model);
        }
      },
      updateModel() {
        this.currentValue = (this.value === this.trueValue);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>