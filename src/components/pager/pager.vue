<template>
    <ul class="w-pager">
        <li
                :class="['w-pager-item','w-pager-item-prev',currentPage===1?'w-pager-item--disabled':'']"
                @click="onChange(currentPage-1)"
        >上一页</li>
        <li v-for="page in pages"
            class="w-pager-item"
            :class="{'w-pager-item--active':currentPage === page}"
            @click="onChange(page)"
        >
            {{page}}
        </li>
        <li
                :class="['w-pager-item','w-pager-item-next',currentPage===totalPage?'w-pager-item--disabled':'']"
                @click="onChange(currentPage+1)"
        >下一页</li>
    </ul>
</template>

<script>
  export default {
    name: "WPager",
    props: {
      totalPage: Number,
      currentPage: {
        type: Number,
        default: 1
      },
      hideIfSinglePage: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      pages() {
        // 显示 第一页   最后一页
        let pages = [1, this.currentPage, this.currentPage - 1, this.currentPage - 2, this.currentPage + 1, this.currentPage + 2, this.totalPage];
        pages =
          this.distinctByObj(pages)
            .sort((a, b) => a - b)
            .filter(value => value >= 1 && value <= this.totalPage)
            .reduce((prev, cur, index, source) => {
              if (source[index + 1] !== undefined && source[index + 1] - source[index] > 1) {
                prev.push(cur);
                prev.push('...');
              } else {
                prev.push(cur)
              }
              return prev
            }, []);
        return pages;
      }
    },
    methods: {
      distinct(array) {
        if (!Array.isArray(array)) {
          throw new TypeError('required array type')
        }
        let retArray = [];
        for (let i = 0; i < array.length; i++) {
          if (retArray.indexOf(array[i]) === -1) {
            retArray.push(array[i])
          }
        }
        return retArray;
      },
      distinctByObj(array) {
        let result = []
        let obj = {}

        for (let i of array) {
          if (!obj[i]) {
            result.push(i)
            obj[i] = true
          }
        }

        return result
      },
      onChange(index){
        if (index>=1&&index<=this.totalPage){
          this.$emit('onChange',index);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-pager {
        display: inline-flex;
        align-items: center;
        &-item {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            min-width: 32px;
            padding: 0 8px;
            border: 1px solid #d9d9d9;
            cursor: pointer;
            flex-shrink: 0;
            border-radius: 4px;
            transition: all .3s ease-in-out;
            user-select: none;
            &:not(:last-child) {
                margin-right: 8px;
            }
            &--disabled {
                color: #d9d9d9;
                outline: 0;
                cursor: not-allowed;
            }
            &--active,
            &:hover {
                border-color: #1890ff;
                color: #1890ff;
            }
        }
    }
</style>