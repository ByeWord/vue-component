<template>
    <div id="app">
        <w-button icon="camera">Button</w-button>
    </div>
</template>

<script>
  import WIcon from "./components/icon/src/icon";
  import WButton from "./components/button/src/button";
  export default {
    name: 'app',
    components: {WIcon,WButton},
  }
</script>

<style lang="scss">
    #app{
        padding: 20px;
    }
</style>
