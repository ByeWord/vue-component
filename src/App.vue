<template>
  <div id="app">
    <div class="test-row-col"></div>
    <w-row type="flex">
        <w-col
                span="24"
                :phone="{span:24}"
                :pad="{span:12}"
                :narrow-pc="{span:8,offset:16}"
        >
            <div class="demo"></div>
        </w-col>
        <w-col
                span="24"
                :phone="{span:24}"
                :pad="{span:12}"
                :narrow-pc="{span:8,offset:16}"
        ><div class="demo"></div></w-col>
        <w-col
                span="24"
                :phone="{span:24}"
                :pad="{span:12}"
                :narrow-pc="{span:8,offset:16}"
        ><div class="demo"></div></w-col>
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
  .demo{
      border: 1px solid crimson;
      background-color: #CCC;
      height: 200px;
  }
</style>
