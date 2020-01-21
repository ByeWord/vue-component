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
            <select class="w-pagination-jump-pageSelect" @change="handleSelectPageCount($event)">
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
        pageSize: this.pageSizes[0]
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.pageSize) || 1;
      },
      pageNumbers() {//计算显示的页码块数量
        let allPageNumbers = this.allPageNumbers;
        let starPagePos = this.pageStartPos;
        let result = allPageNumbers.slice(starPagePos, starPagePos+this.pageGroup);
        return result;
      },
      allPageNumbers() {
        let len = this.totalPages;
        let result = [];
        // 总页码数小于设置页码数
        if (len < this.pageGroup) {
          while (len--) {
            result.push(this.totalPages - len);
          }
          return result;
        }
        // 总页码数大于设置页码数
        while (len--) {
          result.push(this.totalPages - len);
        }
        console.log(result.length)
        return result;
      },
      pageStartPos() {
        // find the index of the target element
        let targetIdx = this.allPageNumbers.indexOf(this.currentPageNumber);
        let dividing = Math.floor(this.pageGroup / 2);
        // calculate the start position
        let startPos = 0;
        if (targetIdx <= dividing) {// situation-1 targetIdx is in [0,range/2]
          startPos = 0;
        } else if (targetIdx > this.totalPages - 1 - dividing) {// situation-2 targetIdx is in [maxIndex-range/2,maxIndex]
          startPos = this.totalPages - this.pageGroup;
        } else {
          startPos = targetIdx - dividing
        }
        return startPos
      }
    },
    methods: {
      skipToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          console.log(pageNumber)
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
    .active {
        color: #fff;
        background-color: crimson;
    }

    .disabled {
        color: #d9d9d9;
        user-select: none;
    }

    .w-pagination {
        display: inline-flex;
        align-items: center;
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        &-info {

        }
        &-nav {
            display: inline-flex;
            li {
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                height: 32px;
                padding: 0 8px;
                min-width: 32px;
                border: 1px solid #d9d9d9;
                cursor: pointer;
                transition: all 0.3s linear;
                &:not(:first-child) {
                    margin-left: 8px;
                }
                &:not(.disabled):hover {
                    color: #fff;
                    background-color: crimson;
                }
            }
        }
        &-jump {
            margin-left: 8px;
            display: inline-flex;
            align-items: center;
            &-pageSelect, input, span {
                height: 32px;
                box-sizing: border-box;
            }
            span {
                display: inline-block;
                height: 32px;
                padding: 0 8px;
                min-width: 32px;
                line-height: 32px;
                border: 1px solid #d9d9d9;
                cursor: pointer;
                transition: all 0.3s linear;
                background-color: #d9d9d9;
            }
        }
    }
</style>