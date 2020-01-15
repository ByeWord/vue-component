<template>
  <div id="app">
    <div class="test-row-col"></div>
    <w-row type="flex">
      <w-col span="9">
        <w-row type="flex" align="center">
          <w-col span="6" class="demo-col">1</w-col>
          <w-col span="6" class="demo-col">2</w-col>
          <w-col span="6" class="demo-col">3</w-col>
        </w-row>
      </w-col>
      <w-col span="15">
        <w-row>
          <w-col span="3" class="demo-col">1</w-col>
          <w-col span="3" class="demo-col">2</w-col>
          <w-col span="3" class="demo-col">3</w-col>
          <w-col span="3" class="demo-col">4</w-col>
          <w-col span="3" class="demo-col">5</w-col>
          <w-col span="3" class="demo-col">6</w-col>
          <w-col span="3" class="demo-col">7</w-col>
          <w-col span="3" class="demo-col">8</w-col>
        </w-row>
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
  .demo-col{
    border: 1px solid crimson;
    height: 40px;
  }
</style>
