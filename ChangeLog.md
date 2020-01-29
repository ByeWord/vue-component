#2020/01/29
##重构项目结构和重构Button组件并追加功能
###1.重构项目结构

###2.重构Button组件并追加功能
1. 追加一个loading组件,loading状态下直接使用默认loading
```vue
  <w-icon v-if="icon&&!loading" :name="icon"></w-icon>
  <!--为追加的默认loading组件-->
  <w-icon v-if="loading" class="loading" name="loading"></w-icon>
```
2. 追加type属性让用户可以控制按钮的颜色之类的样式按钮选择
* primary
* success
* danger
* warning
3. 追加plain属性开关可以控制type属性下的颜色的亮度提高
4. 由于默认icon排布在文字的左方，如果需要添加icon至右方需要在slot中自行添加
```vue
<w-button button-disabled>禁止按钮<w-icon name="setting"></w-icon></w-button>
```
5. ![alt 效果图](./imageForChangeLog/button.PNG)
###3.重构input组件
1. 在template中嵌套template可以减少不必要的标签
```vue
<template>
    <div class="w-input">
        <input class="w-input-inner" type="text" :read-only="readOnly" :disabled="disabled">
        <!--嵌套template-->
        <template v-if="error">
            <w-icon name="information"></w-icon>
            <span class="info">message</span>
        </template>
    </div>
</template>
```
