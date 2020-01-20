#2020/01/20
##学习开发一个基础pagination
###API设计
1. total 总条数
2. currentPage 当前页码
3. hideIfSinglePage 只有一条数据是是否不显示
4. onChange 页码改变时触发

###相关公式
1. 总页数:totalPage = Math.ceil(total / pageSize)

2. 当前页面的页码数量:pageBlockList分为以下情况
1. 总页数少于设置页码数量
		直接按照总页数个数显示
2. 总页数大于等于设置的页码数量，在有序序列中查找出指定元素前后共n个元素的序列
		[开始页|..当前页..|结束页]
```ecmascript 6
// 在有序序列中查找出指定元素前后共n(n>该序列的长度)个元素的序列
let range = 6;
let target1 = 1;
let target2 = 2;
let target3 = 3;
let target4 = 9;
let target5 = 5;
let sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// find the index of the target element
let targetIdx = sortedArray.indexOf(target3);
let dividing = Math.floor(range / 2);
// calculate the start position
let startPos = 0;
if (targetIdx <= dividing) {// situation-1 targetIdx is in [0,range/2]
  startPos = 0;
} else if (targetIdx > sortedArray.length - 1 - dividing) {// situation-2 targetIdx is in [maxIndex-range/2,maxIndex]
  startPos = sortedArray.length - range;
} else {
  startPos = targetIdx - dividing
}


function maxIndexOf(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('')
  }
  return array.length - 1;
}

console.log(sortedArray.splice(startPos, range));

```		

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