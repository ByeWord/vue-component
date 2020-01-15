# vue-components

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#Progress
##2019/01/15
###开发组件[Row,Col]
####Row Props
| 属性 | 类型 | 默认值 | Comments|
| :-----| :---- | :----|:----|
| gutter | [String, Number] | - |通过Row组件将该数据传递到子组件的row中.<br>好处如下：<br>1.简化了代码,不必为每个Col添加gutter属性<br>遇到的难点:<br>Vue不推荐通过vm修改组件props,所以将col的gutter绑定在data中,通过computed监听gutter变化，修改样式 |
| type | [String,] | - | 可以使用flex |
####Col Props
| 属性 | 类型 | 默认值 | Comments|
| :-----| :---- | :----|:----|
| span | [String, Number] | - | 占比，24份|
| offset | [String,Number] | - | 通过修改margin来修改offset |

收获：<br>
1.为元素清除浮动
2.通过computed优化HTML代码
```vue
 <div class="w-row" :style="rowStyle">
        <slot></slot>
  </div>
```

```ecmascript 6
module.exports = {
  //省略一部分代码
computed: {
      rowStyle() {
       let {gutter} = this;
       return !!gutter ? {marginLeft: `${-gutter / 2}px`, marginRight: `${-gutter / 2}px`} : '' 
      }
    }
}
```
3.使用data和computed来实现通过vm修改自身的数据和变化改变
4.关于created和mounted可以用如下方式解释
```ecmascript 6
let parent = document.createElement('div'); // parent created
let children = document.createElement('div'); // child created
parent.appendChild(children); // children mounted
document.body.appendChild(parent);//parent mounted
```
5.为了实现gutter两边的col贴边，通过修改Row的margin-left&right为-gutter/2