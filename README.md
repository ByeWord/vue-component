#2020/01/16
##Toast组件开发
###设计规范
```
$toast-height:40px;
$toast-bg:rgba(0,0,0,.75);
$toast-font-size:14px;
$toast-font-color:#fff;
$toast-shadow:0 0 3px 0px rgba(0,0,0,.5)
```
###功能需求

###Vue plugin,Vue.extend,vm.$mount,vm.$el
1. Vue plugin的用法，your-plugin提供install函数(Vue)=>Vue.use(your-plugin)
2. Vue.extend动态创建实例
3. vm.$mount生成$el
4. 将$el挂载到对应的DOM上<br>