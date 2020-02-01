<template>
    <div id="app">
        <div class="demo">
            <h2 class="title">button</h2>
            <div class="basic-btn basic-btn-demo">
                <w-button>默认按钮</w-button>
                <w-button type="primary">主要按钮</w-button>
                <w-button type="danger">危险按钮</w-button>
                <w-button type="warning">警告按钮</w-button>
                <w-button type="success">成功按钮</w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button>朴素按钮</w-button>
                <w-button type="primary" plain>主要按钮</w-button>
                <w-button type="danger" plain>危险按钮</w-button>
                <w-button type="warning" plain>警告按钮</w-button>
                <w-button type="success" plain>成功按钮</w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button round>圆角按钮</w-button>
                <w-button type="primary" round>主要按钮</w-button>
                <w-button type="danger" round>危险按钮</w-button>
                <w-button type="warning" round>警告按钮</w-button>
                <w-button type="success" round>成功按钮</w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button icon="search" circle></w-button>
                <w-button type="primary" icon="search" circle></w-button>
                <w-button type="danger" icon="search" circle></w-button>
                <w-button type="warning" icon="search" circle></w-button>
                <w-button type="success" icon="search" circle></w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button button-disabled>禁止按钮</w-button>
                <w-button type="primary" button-disabled>主要按钮</w-button>
                <w-button type="danger" button-disabled>危险按钮</w-button>
                <w-button type="warning" button-disabled>警告按钮</w-button>
                <w-button type="success" button-disabled>成功按钮</w-button>
            </div>
            <div class="basic-btn basic-btn-demo">
                <w-button icon="search">默认按钮</w-button>
                <w-button type="primary" icon="search">主要按钮</w-button>
                <w-button type="danger" icon="search">危险按钮</w-button>
                <w-button type="warning" icon="search">警告按钮</w-button>
                <w-button type="success" icon="search">成功按钮</w-button>
            </div>
            <div class="basic-btn basic-btn-demo">
                <w-button>默认按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="primary">主要按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="danger">危险按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="warning">警告按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="success" >成功按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
            </div>
            <div class="basic-btn basic-btn-demo">
                <w-button loading>默认按钮</w-button>
                <w-button type="primary" loading>主要按钮</w-button>
                <w-button type="danger" loading>危险按钮</w-button>
                <w-button type="warning" loading>警告按钮</w-button>
                <w-button type="success" loading>成功按钮</w-button>
            </div>
        </div>
        <div class="demo">
            <h2 class="title">input</h2>
            <div class="basic-input-demo">
                <w-input v-model="inputValue"></w-input>
                <w-input disabled v-model="inputValue" error="密码不能少于6位"></w-input>
                <w-input readonly v-model="inputValue" error="密码不能少于6位"></w-input>
            </div>
        </div>
        <div class="demo" style="height: 400px;">
            <h2 class="title">datepicker</h2>
            <w-datepicker></w-datepicker>
        </div>
        <div class="demo">
            <h2 class="title">pagination</h2>
            <w-pagination :total="1000" :current-change.sync="currentPage" :current-page="currentPage"></w-pagination>
        </div>
        <div class="demo">
            <h2 class="title">scroll-view</h2>
            <w-scroll-view style="height: 400px;">
                <p v-for="num in 50" :key="num">{{num}}</p>
            </w-scroll-view>
        </div>
        <div class="demo">
            <w-button class="toast-btn" @click="showToast('top')">Toast-Up</w-button>
            <w-button class="toast-btn" type="primary" @click="showToast('left')">Toast-Left</w-button>
            <w-button class="toast-btn" type="danger" @click="showToast('right')">Toast-Right</w-button>
            <w-button class="toast-btn" type="warning" @click="showToast('bottom')">Toast-Bottom</w-button>
            <w-button class="toast-btn" type="success" @click="showToast('middle')">Toast-Middle</w-button>
        </div>
    </div>
</template>

<script>
  import WIcon from "./components/icon/src/icon";
  import WButton from "./components/button/src/button";
  import WInput from "./components/input/src/input";
  import WDatepicker from "./components/datepicker/src/datepicker";
  import WPagination from "./components/pagination/src/pagination";
  import WScrollView from "./components/scroll-view/src/scroll-view";

  export default {
    name: 'app',
    components: {WPagination, WDatepicker, WIcon, WButton,WInput,WScrollView},
    data(){
      return{
        inputValue:'',
        currentPage: 1
      }
    },
    methods:{
      showToast(direction){
        this.$toast({
          message:'message',
          position:direction
        })
      }
    }
  }
</script>

<style lang="scss">
    #app {
        padding: 20px;
    }

    .demo {
        display: flex;
        flex-direction: column;
        width: 800px;
        margin: 0 auto;
        border: 1px solid #cccccc;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        padding: 20px;
        &:not(:last-child){
            margin-bottom: 20px;
        }
    }

    .basic-btn-demo {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    .basic-input-demo{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }
    .title{
        text-align: center;
        padding: 0;
        margin: 0 0 16px 0;
    }
    .toast-btn{
        &:not(:last-child){
            margin-bottom: 12px;
        }
    }
</style>
