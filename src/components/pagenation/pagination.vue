<template>
    <nav class="w-pagination">
        <span class="w-pagination-info">共<em>{{totalPages}}</em>页/{{total}}条</span>
        <ul class="w-pagination-nav">
            <li :class="{'disabled': currentPageNumber === 1}" @click="skipToPage(1)">首页</li>
            <li :class="{'disabled': currentPageNumber === 1}" @click="skipToPage(currentPageNumber-1)">上一页</li>
            <li v-for='(num,id) in pageNumbers' :key='id' @click="skipToPage(num)"
                :class="{'active':(currentPageNumber===num)}">{{num}}
            </li>
            <li :class="{'disabled': currentPageNumber === totalPages}" @click="skipToPage(currentPageNumber+1)">
                下一页
            </li>
            <li :class="{'disabled': currentPageNumber === totalPages}" @click="skipToPage(totalPages)">尾页
            </li>
        </ul>
        <div class="w-pagination-jump">
            <select class="pageSelect" @change="handleSelectPageCount($event)">
                <option v-for="(num,ide) in pageSizes" :key="ide" :value="num">{{num}}条/页</option>
            </select>
            <input type="text" v-model="targetPageNumber" @keyup.enter="submit($event)">
            <span @click="skipTo">跳转</span>
        </div>
    </nav>
</template>

<script>
  export default {
    name: "w-pagination",
    //共有多少条数据，每页显示多少条数据，有多少个分页，显示多少个分页
    //数据总条数、每页显示条数、显示页码数，同时我们需要定义当前页参数（默认为1），显示条数（默认10条），跳转页（默认第1页）
    props: {
      currentPageNumber: {//当前页页码
        type: Number,
        default: 1
      },
      total: {//数据总量，非页码总量
        type: Number
      },
      pageSizes: { // 供用户选择的每页展示项目数量
        type: Array,
        default: () => [5, 10, 15, 20]
      },
      pageGroup: {//展示页码项目数量
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        targetPageNumber: 1, //跳转的目标页面
        currentPageSize: this.pageSizes[0]
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.currentPageSize) || 1;
      },
      pageNumbers() {//计算显示的页码块数量
        let len = this.totalPages;
        let count = Math.floor(this.pageGroup / 2);
        let center = this.currentPage;
        let temp = [];
        // 总页码数小于设置页码数
        if (len < this.pageGroup) {
          while (len--) {
            temp.push(this.totalPages - len);
          }
          return temp;
        }
        // 总页码数大于设置页码数
        while (len--) {
          temp.push(this.totalPages - len);
        }
        let idx = temp.indexOf(center);
        if (idx <= count) {
          center = center + count - idx;
        } else if (idx > this.totalPages - count - 1) {
          center = this.totalPages - count;
        }
        temp = temp.splice(center - count - 1, this.pageGroup);
        return temp;
      }
    },
    methods: {
      skipToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.$emit('pageNumberChange', {page: pageNumber, pageSize: this.pageSize});
        }
      },
      skipTo() {
        this.skipToPage(this.targetPageNumber)
      },
      handleSelectPageCount(e) {
        this.$emit('onShowSizeChange', {page: this.currentPage, pageSize: parseInt(e.target.value)});
      }
    }
  }
</script>

<style lang="scss" scoped>
    .active{
        color: crimson;
    }
</style>