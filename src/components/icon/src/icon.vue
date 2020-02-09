<template>
    <svg class="w-icon" aria-hidden="true" v-if="!!name" @click="$emit('click')">
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>

<script>
  export default {
    name: "WIcon",
    props:{
      name:{
        type:String
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-icon {
        font-size: 16px;
        width: 1em;
        height: 1em;
        fill: currentColor;
        overflow: hidden;
        &--right{
            margin-left: 6px;
        }
    }
</style>