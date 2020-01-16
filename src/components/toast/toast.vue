<template>
    <div class="w-toast">
        {{message}}
    </div>
</template>

<script>
  export default {
    name: "w-toast",
    props:{
      message:[String]
    },
    created(){
      console.log('toast created')
    },
    mounted(){
      console.log('toast mounted')
    }
  }
</script>

<style lang="scss" scoped>
    $font-size:14px;
    $toast-height:40px;
    $toast-bg:rgba(0,0,0,.75);
    $toast-font-size:14px;
    $toast-font-color:#fff;
    $toast-shadow:0 0 3px 0px rgba(0,0,0,.5);
    .w-toast{
        height: $toast-height;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
        font-size: $font-size;
        line-height: 1.8;
        background-color: $toast-bg;
        box-shadow: $toast-shadow;
        color: $toast-font-color;
        min-width: 288px;
    }
</style>