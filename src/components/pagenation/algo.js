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
