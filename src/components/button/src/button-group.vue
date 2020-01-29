<template>
    <div class="w-button-group">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WButton-group"
  }
</script>

<style lang="scss" scoped>
    .w-button-group{
        display: inline-block;
    }
</style>