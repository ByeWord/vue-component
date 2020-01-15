<template>
  <div id="app">
    <w-row gutter="20">
      <w-col span="12">
        hello
      </w-col>
      <w-col span="12">
        world
      </w-col>
    </w-row>
  </div>
</template>

<script>
import WRow from '@/components/row.vue';
import WCol from '@/components/col.vue';

export default {
  name: 'app',
  components: {
    WRow,
    WCol
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
</style>
