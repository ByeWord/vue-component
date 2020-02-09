<!--v-if="pagers.length === 1 && hideOnSinglePage"-->
<template>
    <div class="w-pagination" v-if="pagers.length === 1 && hideOnSinglePage">
        <!--<span class="w-pagination__total">共{{total}}条</span>-->
        <!--<span class="w-pagination__sizes">100条/页</span>-->
        <button class="btn-prev" :class="{disabled: currentPage === 1}" @click="prevClick">
            <w-icon name="back"></w-icon>
        </button>
        <ul class="w-pagination__pager">
            <li
                    :class="{ active: currentPage === 1, disabled }"
                    v-if="maxPager > 0"
                    class="number"
                    @click="currentChange(1)">1
            </li>
            <li
                    class="pager-more pager-more-prev"
                    v-if="showPrevMore"
                    @mouseenter="wantedPrevMore = true"
                    @mouseleave="wantedPrevMore = false"
                    @click="morePagers('prev-more')"
            >
                <w-icon v-if="!wantedPrevMore" name="checkmore"></w-icon>
                <w-icon v-if="wantedPrevMore" name="left"></w-icon>
            </li>
            <li
                    class="number"
                    v-for="(pager,index) in pagers"
                    :key="`page_${index}_${pager}`"
                    @click="currentChange(pager)"
                    :class="{ active: currentPage === pager, disabled }"
            >
                {{pager}}
            </li>
            <li
                    class="pager-more pager-more-next"
                    v-if="showNextMore"
                    @mouseenter="wantedNextMore = true"
                    @mouseleave="wantedNextMore = false"
                    @click="morePagers('next-more')"
            >
                <w-icon v-if="!wantedNextMore" name="checkmore"></w-icon>
                <w-icon v-if="wantedNextMore" name="right"></w-icon>
            </li>
            <li
                    :class="{ active: currentPage === maxPager, disabled }"
                    v-if="maxPager > 1"
                    class="number"
                    @click="currentChange(maxPager)"
            >{{maxPager}}
            </li>
        </ul>
        <button class="btn-next" :class="{disabled: currentPage === maxPager}" @click="nextClick">
            <w-icon name="next"></w-icon>
        </button>
    </div>
</template>

<script>
  import WIcon from '../../icon/src/icon';

  export default {
    name: "WPagination",
    components: {
      WIcon
    },
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number
      },
      pageSizes: {
        type: Array,
        default: () => [10, 20, 30, 40, 50, 100]
      },
      pagerCount: {
        type: Number,
        default: 7,
        validator: (v) => {
          if (v >= 5 && v % 2 === 1) {
            return true;
          }
          console.error('pagerCount must be 2n+1 and at less 5');
          return false;
        }
      },
      currentPage: {
        type: Number,
        default: 1
      },
      prevText: {
        type: String,
      },
      nextText: {
        type: String,
      },
      hideOnSinglePage: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showPrevMore: false,
        showNextMore: false,
        wantedPrevMore: false,
        wantedNextMore: false
      }
    },
    computed: {
      pagers() {
        let pageCount = this.maxPager;

        let pagerCount = Number(this.pagerCount);

        let halfPagerCount = Math.ceil(pagerCount / 2);

        let showPrevMore = false;

        let showNextMore = false;

        let currentPage = this.currentPage;

        if (pageCount > pagerCount) {
          if (currentPage > halfPagerCount) {
            showPrevMore = true;
          }
          if (currentPage < pageCount - halfPagerCount) {
            showNextMore = true;
          }
        }

        const array = [];
        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2);
          for (let i = startPage; i < pageCount; i++) {
            array.push(i);
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i);
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1;
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i);
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i);
          }
        }
        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;


        return array;
      },
      maxPager() {
        return Math.ceil(this.total / this.pageSize);
      }
    },
    watch:{
      showPrevMore(v){
        if (v){
          this.wantedPrevMore = false
        }
      },
      showNextMore(v){
        if(v){
          this.wantedNextMore = false
        }
      }
    },
    methods: {
      prevClick() {
        if (this.currentPage > 1) {
          this.$emit('prevClick', this.currentPage - 1);
          this.currentChange(this.currentPage - 1);
        }
      },
      nextClick() {
        if (this.currentPage < this.maxPager) {
          this.$emit('nextClick', this.currentPage + 1);
          this.currentChange(this.currentPage + 1);
        }
      },
      morePagers(command) {
        let targetPager = null;
        if (command === 'prev-more') {
          targetPager = this.currentPage - (this.pagerCount - 2);
          if (targetPager <= 0) {
            targetPager = this.currentPage
          }
        } else if (command === 'next-more') {
          targetPager = this.currentPage + (this.pagerCount - 2);
          if (targetPager > this.maxPager) {
            targetPager = this.maxPager
          }
        }
        this.currentChange(targetPager);
      },
      sizeChange() {
        this.$emit('sizeChange')
      },
      currentChange(page) {
        console.log(page);
        this.$emit('update:currentChange', page)
      }
    }
  }
</script>

<style lang="scss" scoped>
    @mixin pager {
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 36px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        text-align: center;
        background-color: #f4f4f5;
        border-radius: 4px;
        border: none;
    }

    .w-pagination {
        display: flex;
        align-items: center;
        button {
            display: flex !important;
            outline: none;
            align-items: center;
            justify-content: center;
            @include pager;
        }
        &__pager {
            padding: 0;
            margin: 0 6px;
            display: flex;
            align-items: center;
            li {
                list-style: none;
                &:not(:first-child) {
                    margin-left: 2px;
                }
                @include pager;
                &.active {
                    color: #fff;
                    background-color: #409eff;
                }
                &.pager-more {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s
    }
</style>