<template>
    <div class="w-table-wrapper">
        <table class="w-table">
            <thead>
            <tr>
                <th>#</th>
                <th v-for="column in columns">{{column.text}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in dataSource">
                <td>{{index}}</td>
                <template v-for="column in columns">
                    <td>{{data[column.field]}}</td>
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
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-table-wrapper {
        .w-table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    }
</style>