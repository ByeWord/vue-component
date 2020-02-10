<template>
    <div class="w-table-wrapper" ref="wrapper">
        <w-scroll-view :style="{height:height+'px'}">
            <table class="w-table" :class="{bordered,compact,striped}" ref="table">
                <thead>
                <tr>
                    <th v-if="showIndex">#</th>
                    <th v-if="selectable">
                        <input type="checkbox"
                               @change="onChangeAllItems"
                               ref="allCheckBox"
                               :checked="areAllItemsSelected"
                        />
                    </th>
                    <th v-for="column in columns" :key="column.field">
                        <div class="w-table-header">
                            <span>{{column.text}}</span>
                            <div class="w-table-sorter" v-if="column.sortable">
                                <w-icon :class="['sorter','sorter-asc',sortedField.field === column.field && sortedField.type==='asc' && 'active']"
                                        name="asc"
                                        @click="ascOrder(column.field)"></w-icon>
                                <w-icon :class="['sorter','sorter-desc',sortedField.field === column.field && sortedField.type==='desc' && 'active']"
                                        name="desc"
                                        @click="descOrder(column.field)"></w-icon>
                            </div>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody v-if="dataSource.length > 0">
                <tr v-for="(data,index) in dataSource" :key="data.id">
                    <td v-if="showIndex">{{index+1}}</td>
                    <td v-if="selectable">
                        <input type="checkbox"
                               :checked="isChecked(data)"
                               @change="handleSelect(data,index,$event)"
                        />
                    </td>
                    <template v-for="column in columns">
                        <td :key="column.field">{{data[column.field]}}</td>
                    </template>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td class="without-data" :colspan="colspan">{{tipsWithNoData}}</td>
                </tr>
                </tbody>
            </table>
        </w-scroll-view>
        <!--<div :style="{height:height+'px',overflow: 'auto'}">-->
           <!---->
        <!--</div>-->
        <w-pagination :total="dataSource.length"></w-pagination>
        <div class="w-table-loading" v-if="loading">
            <w-icon name="loading" class="loading"></w-icon>
        </div>
    </div>
</template>

<script>
  export default {
    name: "WTable",
    props: {
      columns: { // 表头的每一列
        type: Array,
        required: true
      },
      dataSource: { // 每一行的数据
        type: Array,
        required: true,
        validator: (array) => {
          return array.every(item => item.id !== undefined);
        }
      },
      showIndex: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: true
      },
      compact: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: true
      },
      selectedItems: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      tipsWithNoData: {
        type: String,
        default: '没有数据可展示'
      },
      selectable: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number | String
      }
    },
    data() {
      return {
        sortedField: {
          field: undefined,
          type: undefined
        },
        copyTable:undefined
      }
    },
    computed: {
      colspan() {
        let count = 0;
        if (this.showIndex) count++;
        if (this.selectable) count++;
        return this.columns.length + count;
      },
      areAllItemsSelected() {
        const a = this.dataSource.map(item => item.id).sort();
        const b = this.selectedItems.map(item => item.id).sort();
        if (a.length === b.length) {
          let equals = true;
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              equals = false;
              break;
            }
          }
          return equals;
        }
        return false;
      }
    },
    watch: {
      selectedItems() {
        if (this.selectedItems.length === this.dataSource.length || this.selectedItems.length === 0) {
          this.$refs.allCheckBox.indeterminate = false;
        } else {
          this.$refs.allCheckBox.indeterminate = true;
        }
      }
    },
    methods: {
      handleSelect(item, index, evt) {
        let selected = evt.target.checked;
        let copy = JSON.parse(JSON.stringify(this.selectedItems));
        if (selected) {
          copy.push(item);
        } else {
          copy = copy.filter(i => i.id !== item.id);
        }
        this.$emit('update:selectedItems', copy)
      },
      onChangeAllItems(evt) {
        let selected = evt.target.checked;
        if (selected) {
          this.$emit('update:selectedItems', this.dataSource)
        } else {
          this.$emit('update:selectedItems', [])
        }
      },
      isChecked(item) {
        return this.selectedItems.filter(i => i.id === item.id).length > 0
      },
      areSameArray(arr1, arr2, property) {

      },
      ascOrder(field) {
        this.sortedField = {
          field,
          type: 'asc'
        };
        let copyCol = JSON.parse(JSON.stringify((this.columns.filter(i => i.field === field)[0])));
        this.$emit('on-sort-change', {column: copyCol, field, order: 'asc'})
      },
      descOrder(field) {
        this.sortedField = {
          field,
          type: 'desc'
        };
        let copyCol = JSON.parse(JSON.stringify((this.columns.filter(i => i.field === field)[0])));
        this.$emit('on-sort-change', {column: copyCol, field, order: 'desc'})
      },
      updateHeaderWidth(){
        let tableHeaderCopy = null;
        let tableHeader = Array.from(this.$refs.table.children).filter(item => item.tagName.toLowerCase() === 'thead')[0];
        this.copyTable.classList.add('w-table-copy');
        Array.from(this.copyTable.children).map(item => {
          if (item.tagName.toLowerCase() !== 'thead') {
            item.remove()
          } else {
            tableHeaderCopy = item;
          }
        });
        Array.from(tableHeader.children[0].children).map((th, index) => {
          let {width} = th.getBoundingClientRect();
          tableHeaderCopy && (tableHeaderCopy.children[0].children[index].style.width = width + 'px');
        });
      }
    },
    mounted() {
      // 固定表头
      // 方式一：使用clone-node
      let copyTable = this.$refs.table.cloneNode(true);
      this.copyTable = copyTable;
      let wrapper = this.$refs.wrapper;
      wrapper.appendChild(copyTable);
      this.updateHeaderWidth();
      this.onWindowResize = ()=>this.updateHeaderWidth();
      window.addEventListener('resize',this.onWindowResize)
    },
    beforeDestroy(){
      window.removeEventListener('resize',this.onWindowResize)
    }
  }
</script>

<style lang="scss" scoped>
    .w-table-wrapper {
        position: relative;
        /*overflow: auto;*/
        .w-table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            &.bordered {
                border: 1px solid #999999;
                th, td {
                    border: 1px solid #999999;
                }
            }
            &.compact {
                th, td {
                    padding: 4px;
                }
            }
            &.striped {
                tbody {
                    tr {
                        &:nth-child(odd) {
                            background-color: #fff;
                        }
                        &:nth-child(even) {
                            background-color: #e3e4e5;
                        }
                    }
                }
            }
            &-header {
                display: flex;
                align-items: center;
            }
            &-sorter {
                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 4px;
                svg {
                    width: 8px;
                    height: 8px;
                    fill: grey;
                }
                .sorter {
                    cursor: pointer;
                    &:hover {
                        fill: darken(grey, 30%);
                    }
                    &.active {
                        fill: black;
                    }
                }
            }
            &-loading {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                .loading {
                    height: 30px;
                    width: 30px;
                    animation: spin 3s linear infinite;
                }
            }
            .without-data {
                padding: 20px !important;
                text-align: center !important;
            }

            th, td {
                text-align: left;
                padding: 8px;
            }
            &-copy {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                background-color: #fff;
            }
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>