<template>
    <div class="w-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
  import {findComponentsDownward} from "../../../utils/assits";

  export default {
    name: "WCheckboxGroup",
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        model: this.value,
        children: null
      }
    },
    mounted() {
      let children = this.children = findComponentsDownward(this, 'WCheckbox');
      if (children.length) {
        this.updateChildrenModel();
      }
    },
    methods: {
      change(model) {
        this.model = model;
        this.updateChildrenModel();
        this.$emit('input', this.model);
      },
      updateChildrenModel() {
        this.children.forEach(child => {
          child.model = this.model;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>