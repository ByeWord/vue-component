<template>
    <div class="w-button-group">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WButton-withGroup"
  }
</script>

<style lang="scss" scoped>
    .w-button-group{
        display: inline-block;
    }
</style>