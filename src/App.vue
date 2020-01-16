<template>
    <div id="app">
        <button @click="showToast">toast</button>
        <button @click="showToastWithHTML">toast</button>
    </div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    methods: {
      showToast() {
        this.$toast({
          message:'将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。'
        })
      },
      showToastWithHTML(){
        this.$toast({
          message: '<h1>Hello World</h1>',
          dangerouslyUseHTMLString: true,
          position:'left'
        })
      }
    }
  }
</script>

<style lang="scss">
    @import "assets/css/normalize.css";
</style>
