<template>
    <div class="w-table-wrapper" ref="wrapper">
        <div :style="{height:height+'px',overflow:'auto'}" ref='scrollView'>
            <table class="w-table" :class="{bordered,compact,striped}" ref="table">
                <thead>
                <tr>
                    <th style="width: 50px"></th>
                    <th style="width: 50px" v-if="showIndex">#</th>
                    <th style="width: 50px" v-if="selectable" class="w-table-center">
                        <input type="checkbox"
                               @change="onChangeAllItems"
                               ref="allCheckBox"
                               :checked="areAllItemsSelected"
                        />
                    </th>
                    <th v-for="column in columns" :key="column.field" :style="{width:column.width+'px'}">
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
                <template v-for="(data,index) in dataSource">
                    <tr :key="data.id">
                        <th style="width: 50px" class="w-table-center">
                            <w-icon name="next" @click="toggleExpand(data.id)"></w-icon>
                        </th>
                        <td style="width: 50px" v-if="showIndex">{{index+1}}</td>
                        <td style="width: 50px" v-if="selectable" class="w-table-center">
                            <input type="checkbox"
                                   :checked="isChecked(data)"
                                   @change="handleSelect(data,index,$event)"
                            />
                        </td>
                        <template v-for="column in columns">
                            <td :key="column.field" :style="{width:column.width+'px'}">{{data[column.field]}}</td>
                        </template>
                    </tr>
                    <tr v-if="inExpandIds(data.id)">
                        <td colspan="100">{{data.description || 'xxxx'}}</td>
                    </tr>
                </template>
                </tbody>
                <tbody v-else>
                <tr>
                    <td class="without-data" :colspan="colspan">{{tipsWithNoData}}</td>
                </tr>
                </tbody>
            </table>
        </div>
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
      },
      expandable:{
        type:Boolean
      }
    },
    data() {
      return {
        sortedField: {
          field: undefined,
          type: undefined
        },
        copyTable: undefined,
        expandIds:[]
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
      inExpandIds(id){
        return this.expandIds.indexOf(id)>=0;
      },
      toggleExpand(id){
        if (!this.inExpandIds(id)){
          this.expandIds.push(id);
        } else {
          this.expandIds.splice(this.expandIds.indexOf(id),1);
        }
      },
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
      // updateHeaderWidth(){
      //   let tableHeaderCopy = null;
      //   this.copyTable.classList.add('w-table-copy');
      //   Array.from(this.copyTable.children).map(item => {
      //     if (item.tagName.toLowerCase() !== 'thead') {
      //       item.remove()
      //     } else {
      //       tableHeaderCopy = item;
      //     }
      //   });
      // }
    },
    mounted() {
      // 固定表头
      let copyTable = this.$refs.table.cloneNode(false);
      this.copyTable = copyTable;
      this.copyTable.classList.add('w-table-copy');
      let wrapper = this.$refs.wrapper;
      let tHead = this.$refs.table.children[0];
      let {height} = tHead.getBoundingClientRect();
      this.$refs.scrollView.style.marginTop = height + 'px';
      copyTable.appendChild(tHead);
      wrapper.appendChild(copyTable);
      // this.updateHeaderWidth();
      // this.onWindowResize = ()=>this.updateHeaderWidth();
      // window.addEventListener('resize',this.onWindowResize)
    },
    beforeDestroy() {
      // window.removeEventListener('resize',this.onWindowResize);
      this.copyTable.remove();
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
            .w-table-center{
                text-align: center !important;
            }
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