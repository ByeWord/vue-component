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
##2020/01/15
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
| phone | [String,Object] | - | {span:'',offset:''} |
| pad | [String,Object] | - | {span:'',offset:''} |
| narrowPc | [String,Object] | - | {span:'',offset:''} |
| widePc | [String,Object] | - | {span:'',offset:''} |

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
<br>
**待开发功能响应式col<class中类名顺序无关，仅与CSS中类名的顺序相关>**
phone <= 576px <br>
pad >576px & < 768px <br>
narrowPc > 769px & < 1200px <br>
widePc >1201px <br>

```
// 抽离公共校验validator
  let validator = (value) => {
    let keys = Object.keys(value);
    let valid = true;
    keys.forEach(key => {
      if (!['span', 'offset'].includes(key)) {
        valid = false;
      }
    });
    return valid;
  };
  export default {
    name: "WCol",
    props: {
      span: [Number, String],
      offset: [Number, String],
      phone: {type: Object, validator},
      pad: {type: Object, validator},
      narrowPc: {type: Object, validator},
      widePc: {type: Object, validator}
    },
    data() {
      return {
        gutter: 0
      }
    },
    computed: {
      colStyle() {
        let {gutter} = this;
        return !!gutter ? {paddingLeft: `${gutter / 2}px`, paddingRight: `${gutter / 2}px`} : ''
      },
      colClass() {
        let {span, offset, phone, pad, narrowPc, pc, widePc} = this;

        //抽象出一个类名生成器
        let createClasses = (data, str = "") => {
          if (!data) return [];
          let array = [];
          if (data.span) {
            array.push(`w-col-${str}${data.span}`)
          }

          if (data.offset) {
            array.push(`w-col-offset-${str}${data.offset}`)
          }
          return array;
        };
        span = span ? span : 24;
        return [
          ...createClasses({span, offset}),
          ...createClasses(phone, 'phone-'),
          ...createClasses(pad, 'pad-'),
          ...createClasses(narrowPc, 'narrow-pc-'),
          ...createClasses(pc, 'pc-'),
          ...createClasses(widePc, 'wide-pc-')
        ]
      }
    }
  }
</script>
```
#Layout
##2020/01/16
完成基本Layout组件
TODO
1. 需要完善和添加sider的隐藏动画
2. 需要测试后续测试
