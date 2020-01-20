#2020/01/20
##学习开发一个基础pagination
###API设计
1. totalPage
2. currentPage
3. hideIfSinglePage
4. onChange

###页码的处理1：数组去重、排序
```
let pages = [1,this.totalPage,this.currentPage,this.currentPage-1,this.currentPage-2,this.currentPage+1,this.currentPage+2]
```
1. 去重
1.1 使用Set
```
let result = [...new Set(your-array)]
```
1.2. 使用对象转换
```
let obj = {};
your-array.reduce((cur,num)=>{
  returb obj[num] = true
},obj)
// 涉及到面试知识点 your-array.map(parseInt)错误用法,parseInt(str,进制)而map需要的回调(item,index)=>
let result = Object.keys(obj).map(strNum=>parseInt(strNum));
```
2. 使用数组的API sort(your-comparator),不传回调默认使用字符串的方式排序
```
your.array.sort((a,b)=>a-b)
```
###页码处理2：省略号处理
```
let uniqueArray = [...]
let result = uniqueArray.reduce((prev,current,index,array)=>{
  prev.push(current);
  array[index+1] !== undefined && array[index+1] - array[index] >1 && prev.push('...');
  return prev;
},[])
```
###一个标签内使用不同标签
1. 使用template标签结合v-if/v-else-if/v-else