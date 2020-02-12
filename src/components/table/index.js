import Table from './src/table';
import TableColumn from './src/table-column';

Table.install = function (Vue) {
  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);
};

export default Table;