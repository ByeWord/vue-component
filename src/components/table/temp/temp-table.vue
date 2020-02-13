<template>
    <div class="w-table-wrapper" ref="wrapper">
        <div class="w-table-header" :style="tHeaderStyle" ref="tableHeader">
            <table class="w-table" cellspacing="0" cellpadding="0">
                <colgroup>
                    <template v-for="col in columns">
                        <col :width="!!col.width?col.width:colWidth"></col>
                    </template>
                </colgroup>
                <thead>
                <tr class="w-table-row">
                    <th v-for="col in columns" class="w-table-cell">
                        {{col.text}}
                    </th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="w-table-body" :class="tBodyClass" :style="tBodyStyle" ref="tBody">
            <table class="w-table" cellspacing="0" cellpadding="0" ref="tBodyTable">
                <colgroup>
                    <template v-for="col in columns">
                        <col :width="!!col.width?col.width:colWidth"></col>
                    </template>
                </colgroup>
                <tbody>
                <template v-for="(row,rowIndex) in data">
                    <tr class="w-table-row">
                        <td v-for="col in columns" class="w-table-cell">
                            <template v-if="col.render">
                                <table-render :render="col.render" :row="row" :column="col"
                                              :index="rowIndex"></table-render>
                            </template>
                            <template v-else-if="col.slot">
                                <slot :name="col.slot" :row="row" :column="col" :index="rowIndex"></slot>
                            </template>
                            <template v-else>
                                {{row[col.field]}}
                            </template>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  import TableRender from './table-render';

  export default {
    name: "temp-table",
    components: {
      TableRender
    },
    props: {
      /**
       * formatter:
       * {
       *     key，
       *     title
       * }
       */
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      height: {
        type: String | Number
      },
      bordered: {
        type: Boolean
      }
    },
    data() {
      return {
        colWidth: undefined,
        fixedHeaderPadding: undefined,
        headerHeight: undefined
      }
    },
    computed: {
      tBodyStyle() {
        if (this.height) {
          return {height: `${this.height-this.headerHeight }px`}
        }
        return '';
      },
      tHeaderStyle() {
        if (this.height && this.fixedHeaderPadding > 0) {
          return {paddingRight: this.fixedHeaderPadding + 'px'}
        }
        return '';
      },
      tBodyClass() {
        if (this.height) {
          return ['overflowY-auto']
        }
        return [];
      }
    },
    mounted() {
      this.colWidth = this.calColWidth();
      let {height: headerHeight} = this.$refs.tableHeader.getBoundingClientRect();
      let {width: bodyWrapperWidth} = this.$refs.tBody.getBoundingClientRect();
      let {width: bodyWidth} = this.$refs.tBodyTable.getBoundingClientRect();
      this.fixedHeaderPadding = parseInt(bodyWrapperWidth - bodyWidth);
      this.headerHeight = headerHeight;
      this.onWinResize = () => this.calColWidth();
      window.addEventListener('resize', this.onWinResize);
    },
    methods: {
      calColWidth() {
        let wrapper = this.$refs.wrapper;
        let {width} = wrapper.getBoundingClientRect();

        let colsWithWidth = this.columns.filter(col => col.width);
        let colsWithOutWidth = this.columns.filter(col => !col.width);

        let sumColWithWidth = colsWithWidth.reduce((prev, cur) => {
          return cur.width + prev;
        }, 0);

        let restWidth = width - sumColWithWidth;

        let perColWidth = Math.floor(restWidth / colsWithOutWidth.length);
        console.log('perColWidth', perColWidth);
        return perColWidth;
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWinResize);
    }
  }
</script>

<style lang="scss" scoped>
    .w-table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        &-wrapper {
            position: relative;
        }
        &-header {
            background-color: #f8f8f9;
            &-fixed {
                padding-right: 12px;
            }
        }
        &-body {

        }
        &-cell {
            text-align: left;
            border-bottom: 1px solid #e8eaec;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 8px;
        }
    }

    .overflowY-auto {
        overflow-y: auto;
    }
</style>