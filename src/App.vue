<template>
    <div id="app">
        <w-pager :total-page="totalPage" :current-page="currentPage" @onChange="handlePageChange"></w-pager>
    </div>
</template>

<script>

  import WPager from "./components/pager/pager";

  export default {
    name: 'app',
    components: {WPager},
    data(){
      return {
        currentPage: 1,
        totalPage: 20
      }
    },
    methods:{
      handlePageChange(index){
        this.currentPage = index
      }
    }
  }
</script>

<style lang="scss">

</style>
