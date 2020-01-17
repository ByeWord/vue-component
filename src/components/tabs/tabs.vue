<template>
    <div class="w-tabs" @click="onSelected">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "w-tabs",
    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator: (value) => {
          return true;
        }
      },
      selected:{
        type: String,
        required:true
      }
    },
    methods: {
      onSelected() {
        console.log('clicked');
        this.$emit('update:selected','apple');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>