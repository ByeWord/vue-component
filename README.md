#2020/01/17
##开发Scroll-View组件
###实现原理
原生浏览器出现滚动条必要条件
1. 子容器高度高于父容器
2. 父容器使用overflow:auto
基于监听wheel滚动事件的Scroll-View
1. 子容器高度高于父容器
2. 父容器wrapper使用overflow:hidden;子容器scroll-view用overflow:hidden触发BFC解决边距问题;
3. 父容器监听wheel事件；
	（windows）deltaY正负表示方向 +朝内滚动_页面上移，-朝外滚动_页面下移
	 问题点:虽然监听wheel事件，但是也会导致有滚动条的页面的滚动
4. 滚动条的实现 关系式
```
	滚动条长度与内容长度、可视区域长度、滚动轨道长度的关系
barHeight/trackHeight = visiableHeight / contentHeight
	滚动条滚动距离与内容滚动距离的关系
contentTranslate = -barTranslateY / trackHeight * contentHeight
	
```
###功能列表
1. 
2. 
3. 

#2020/01/18
###完成scroll-view的基本功能
1. 滚轮滚动
2. 鼠标拖动scroll bar实现滚动