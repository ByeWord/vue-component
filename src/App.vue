<template>
    <div id="app">
        <!--<w-pager :total-page="totalPage" :current-page="currentPage" @onChange="handlePageChange"></w-pager>-->
        <w-pagination :total="100" :current-page-number="1" @pageNumberChange="handlePageChange"></w-pagination>
    </div>
</template>

<script>

  import WPager from "./components/pager/pager";
  import WPagination from "./components/pagenation/pagination";

  export default {
    name: 'app',
    components: {WPagination, WPager},
    data(){
      return {
        currentPage: 1,
        totalPage: 20
      }
    },
    methods:{
      handlePageChange(pageInfo){
        this.currentPage = pageInfo.page
      }
    }
  }
</script>

<style lang="scss">

</style>
