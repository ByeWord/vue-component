<template>
    <div id="app">
        <!--<w-pager :total-page="totalPage" :current-page="currentPage" @onChange="handlePageChange"></w-pager>-->
        <w-pagination :total="total" :current-page-number="currentPage"
                      @pageNumberChange="handlePageChange"></w-pagination>
        <div class="gutter"></div>
        <div>{{selected}}</div>
        <div class="gutter"></div>
        <w-table
                :columns="columns"
                :data-source="dataSource"
                :selectedItems.sync="selected"
                :selected-items="selected"
                :order-by="orderBy"
        ></w-table>
    </div>
</template>

<script>

  import WPager from "./components/pager/pager";
  import WPagination from "./components/pagenation/pagination";
  import WTable from "./components/table/table";

  export default {
    name: 'app',
    components: {WTable, WPagination, WPager},
    data() {
      return {
        currentPage: 1,
        total: 500,
        columns: [
          {text: '姓名', field: 'name'},
          {text: '分数', field: 'score'}
        ],
        dataSource: [
          {id: 1, name: 'Json', score: 100},
          {id: 2, name: 'Parser', score: 99},
          {id: 3, name: 'James', score: 98},
          {id: 4, name: 'Steve', score: 101}
        ],
        selected: [],
        orderBy: {
            name:'asc'
        }
      }
    },
    methods: {
      handlePageChange(pageInfo) {
        this.currentPage = pageInfo.page
      }
    }
  }
</script>

<style lang="scss">
    .gutter {
        height: 20px;
    }
</style>
