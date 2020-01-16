<template>
  <div id="app">
    <button @click="showToast">toast</button>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  methods:{
    showToast(){
      this.$toast('Hello Toast')
    }
  }
}
</script>

<style lang="scss">
  @import "assets/css/normalize.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .demo{
      border: 1px solid crimson;
      background-color: #CCC;
      height: 200px;
  }
</style>
