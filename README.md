#2020/01/21
##开发table组件
###功能
1. 展示数据后是否带边框
2. 选中数据（单选/全选）
3. 展示排序
4. 筛选/搜索
5. 固定表头/列
6. 可展开

###API
1. dataSource
2. columns
3. numberVisible
4. onSelect
5. onSelectAll
6. selected

###单向数据流实现单选全选
1. 父组件传递selected，子组件只需通知父组件数据发生变化

###深拷贝的作用
1. 拷贝后是两个对象，不能用===或者indexOf的操作其是否为同一个对象
2. 操作数据，为了不破坏原始数据，而使用深拷贝

###watch操作

#2020/01/22
#开发固定表头和排序

##排序 orderBy:{filed:'desc'}
1. 在props中的validator中无法访问this
2. 某些域无法进行排序

##