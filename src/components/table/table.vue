<template>
    <div class="w-table-wrapper">
        <table class="w-table" :class="{bordered}">
            <thead class="w-table-head">
            <tr>
                <th>
                    <input
                            type="checkbox"
                            @change="onSelectAll"
                            :checked="ardAllItemsSelected"
                            ref="allChecked"
                    />
                </th>
                <th v-if="numberVisible">#</th>
                <th v-for="column in columns" :key="column.field">
                    {{column.text}}<span v-if="column.field in orderBy" class="w-table-sorter">↑↓</span>
                </th>
            </tr>
            </thead>
            <tbody class="w-table-body">
            <tr v-for="(item,idx) in dataSource" :key="item.id">
                <td>
                    <input type="checkbox"
                           @change="handleCheck(item,idx,$event)"
                           :checked="selectedItems.filter(a=>a.id === item.id).length>0"
                    />
                </td>
                <td v-if="numberVisible">{{idx+1}}</td>
                <template v-for="column in columns">
                    <td :key="column.field">{{item[column.field]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: "w-table",
    props: {
      dataSource: {//
        type: Array,
        default: () => []
      },
      columns: { // 表头的数据
        type: Array,
        default: () => [],
        required: true
      },
      numberVisible: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: true
      },
      selectedItems: {
        type: Array,
        default: () => []
      },
      indeterminate: {
        type: Boolean,
        default: false
      },
      orderBy: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      selectedItems() {
        if (this.selectedItems.length === this.dataSource.length) {

        } else if (this.selectedItems.length === 0) {

        } else {

        }
      }
    },
    computed: {
      ardAllItemsSelected() {
        let sortedData = this.dataSource.map(ds => ds.id).sort();
        let sortedSelData = this.selectedItems.map(si => si.id).sort();
        if (sortedData.length !== sortedSelData.length) {
          return false;
        }
        let equal = true;
        for (let i = 0; i < sortedData.length; i++) {
          if (sortedData[i].id !== sortedSelData[i].id) {
            equal = false;
            break;
          }
        }
        return equal;
      }
    },
    methods: {
      handleCheck(item, index, event) {
        let selected = event.target.checked;
        let copy = JSON.parse(JSON.stringify(this.selectedItems));
        if (selected) {
          copy.push(item);
        } else {
          copy = copy.filter(a => a.id !== item.id);
        }
        this.$emit('update:selectedItems', copy);
      },
      onSelectAll(e) {
        let selected = e.target.checked;
        this.$emit('update:selectedItems', selected ? this.dataSource : [])
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        &.bordered {
            border: 1px solid #ccc;
            th, td {
                border: 1px solid #ccc;
            }
        }
        &-head {

        }
        &-body {

        }
        th, td {
            padding: 8px 8px;
        }
        th {
            text-align: left;
        }
        tr {
            border-bottom: 1px solid #ccc;
        }
        tbody {
            tr:nth-child(odd) {
                background-color: #fafafa;;
            }
            tr:nth-child(even):hover {
                background-color: #9d9f;
            }
        }
    }
</style>