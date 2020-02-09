<template>
    <div class="w-table-wrapper">
        <table class="w-table" :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th v-if="showIndex">#</th>
                <th>
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
                            <w-icon :class="['sorter','sorter-asc',sortedField.field === column.field && sortedField.type==='asc' && 'active']" name="asc"
                                    @click="ascOrder(column.field)"></w-icon>
                            <w-icon :class="['sorter','sorter-desc',sortedField.field === column.field && sortedField.type==='desc' && 'active']" name="desc"
                                    @click="descOrder(column.field)"></w-icon>
                        </div>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in dataSource" :key="data.id">
                <td v-if="showIndex">{{index+1}}</td>
                <td>
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
        </table>
        <w-pagination :total="dataSource.length"></w-pagination>
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
      }
    },
    data(){
      return {
        sortedField:{
          field:undefined,
          type:undefined
        }
      }
    },
    computed: {
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
          type:'asc'
        };
        let copyCol = JSON.parse(JSON.stringify((this.columns.filter(i => i.field === field)[0])));
        this.$emit('on-sort-change',{column:copyCol,field,order:'asc'})
      },
      descOrder(field) {
        this.sortedField = {
          field,
          type:'desc'
        };
        let copyCol = JSON.parse(JSON.stringify((this.columns.filter(i => i.field === field)[0])));
        this.$emit('on-sort-change',{column:copyCol,field,order:'desc'})
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-table-wrapper {
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

            th, td {
                text-align: left;
                padding: 8px;
            }
        }
    }
</style>