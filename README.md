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
1. 可手动关闭,关闭回调       [你的消息]|[关闭]
2. 可定时自动关闭
3. 可以定制出现的位置 [左|右|上|下|中]
4. 不同位置不同动画

###Vue plugin,Vue.extend,vm.$mount,vm.$el
1. Vue plugin的用法，your-plugin提供install函数(Vue)=>Vue.use(your-plugin)
2. Vue.extend动态创建实例
3. vm.$mount生成$el
4. 将$el挂载到对应的DOM上<br>
###从页面中移除vm
$el.remove();<br>
vm.$destroy();移除该vm,如事件等