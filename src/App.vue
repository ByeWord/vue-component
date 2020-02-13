<template>
    <div id="app">
        <div class="demo">
            <h2 class="title">栅格</h2>
            <w-row>
                <w-col :span="8">
                    <div style="height: 20px;background-color:orange;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
                <w-col :span="8">
                    <div style="height: 20px;background-color:lightgoldenrodyellow;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
                <w-col :span="8">
                    <div style="height: 20px;background-color:powderblue;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
            </w-row>
            <h3 class="title" style="margin: 12px auto;">offset</h3>
            <w-row>
                <w-col :span="8">
                    <div style="height: 20px;background-color:powderblue;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
                <w-col :span="8" :offset="8">
                    <div style="height: 20px;background-color:orange;text-align: center;border: 1px solid black;">
                        span8_offset8
                    </div>
                </w-col>
            </w-row>
            <h3 class="title" style="margin: 12px auto;">gutter</h3>
            <w-row :gutter="20">
                <w-col :span="8">
                    <div style="height: 20px;background-color:orange;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
                <w-col :span="8">
                    <div style="height: 20px;background-color:lightgoldenrodyellow;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
                <w-col :span="8">
                    <div style="height: 20px;background-color:powderblue;text-align: center;border: 1px solid black;">
                        span8
                    </div>
                </w-col>
            </w-row>
        </div>
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
                <w-button type="success">成功按钮
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
            <w-button class="toast-btn" @click="showToast('offsetTop')">Toast-Up</w-button>
            <w-button class="toast-btn" type="primary" @click="showToast('left')">Toast-Left</w-button>
            <w-button class="toast-btn" type="danger" @click="showToast('right')">Toast-Right</w-button>
            <w-button class="toast-btn" type="warning" @click="showToast('bottom')">Toast-Bottom</w-button>
            <w-button class="toast-btn" type="success" @click="showToast('middle')">Toast-Middle</w-button>
        </div>
        <div class="demo" style="display: block;">
            <w-slides :selected.sync="selected">
                <w-slide-item name="1">
                    <div class="box">1</div>
                </w-slide-item>
                <w-slide-item name="2">
                    <div class="box">2</div>
                </w-slide-item>
                <w-slide-item name="3">
                    <div class="box">3</div>
                </w-slide-item>
            </w-slides>
        </div>
        <div class="demo">
            <h2 class="title">divider</h2>
            <div>
                <span>头上一片晴天，心中一个想念</span>
                <w-divider content-position="left">少年包青天</w-divider>
                <span>饿了别叫妈, 叫饿了么</span>
                <w-divider>
                    <w-icon name="phone"></w-icon>
                </w-divider>
                <span>为了无法计算的价值</span>
                <w-divider content-position="right">阿里云</w-divider>
            </div>
            <div>
                <span>雨纷纷</span>
                <w-divider direction="vertical"></w-divider>
                <span>旧故里</span>
                <w-divider direction="vertical"></w-divider>
                <span>草木深</span>
            </div>
        </div>
        <div class="demo demo-table">
            <w-table :height="300" :data-source="dataSource" :columns="columns" :selected-items.sync="selectedList"></w-table>
        </div>

        <div class="demo">
            <temp-table :data="dataSource" :columns="columns" :height="200">
                <template v-slot:name="{row,column,index}" >
                    <button>{{row.name}}</button>
                </template>
            </temp-table>
        </div>
        <div class="demo">
            <w-checkbox-group v-model="options">
                <w-checkbox label="apple">apple</w-checkbox>
                <w-checkbox label="orange">orange</w-checkbox>
                <w-checkbox label="banana">banana</w-checkbox>
            </w-checkbox-group>
            <hr>
            <w-checkbox v-model="checkboxValue">banana</w-checkbox>
        </div>
        <w-sticky distance="10" style="margin-bottom: 20px">
            <div class="sticky-content" style="background-color:#fff;">
                <div class="demo" style="height: 250px; background-color:#fff;">
                    <h2 class="title">sticky</h2>
                </div>
            </div>
        </w-sticky>
    </div>
</template>

<script>
  import WIcon from "./components/icon/src/icon";
  import WButton from "./components/button/src/button";
  import WInput from "./components/input/src/input";
  import WDatepicker from "./components/datepicker/src/datepicker";
  import WPagination from "./components/pagination/src/pagination";
  import WScrollView from "./components/scroll-view/src/scroll-view";
  import WRow from './components/row/src/row';
  import WCol from './components/col/src/col';
  import WSlides from "./components/slides/src/slides";
  import WSlideItem from "./components/slide-item/src/slide-item";
  import WSticky from "./components/sticky/src/sticky";
  import WDivider from "./components/divider/src/divider";
  import WTable from "./components/table/src/table";
  import WNewTable from "./components/table/src/new-table";
  import TempTable from "./components/table/temp/temp-table";
  import WCheckbox from "./components/checkbox/src/checkbox";
  import WCheckboxGroup from "./components/checkbox-group/src/checkbox-group";

  export default {
    name: 'app',
    components: {
      WCheckboxGroup,
      WCheckbox,
      TempTable,
      WNewTable,
      WDivider,
      WSticky,
      WSlideItem,
      WSlides,
      WPagination,
      WDatepicker,
      WIcon,
      WButton,
      WInput,
      WScrollView,
      WRow,
      WCol,
      WTable
    },
    data() {
      return {
        inputValue: '',
        currentPage: 1,
        selected: '1',
        checkboxValue:true,
        options:['apple','orange'],
        columns: [
          {
            text: '姓名',
            field: 'name',
            slot:'name'
          },
          {text: '分数', field: 'score',sortable:true},
          {text: '描述', field: 'description'},
        ],
        dataSource: [
          {description:'nice',id: 1, name: 'apple', score: 99},
          {description:'nice',id: 2, name: 'banana', score: 100},
          {description:'nice',id: 3, name: 'orange', score: 98},
          {description:'nice',id: 4, name: 'juice', score: 96},
          {description:'nice',id: 5, name: 'bubble', score: 89},
          {description:'nice',id: 6, name: 'papa', score: 100},
          {description:'nice',id: 7, name: 'apple', score: 99},
          {description:'nice',id: 8, name: 'banana', score: 100},
          {description:'nice',id: 9, name: 'orange', score: 98},
          {description:'nice',id: 10, name: 'juice', score: 96},
          {description:'nice',id: 11, name: 'bubble', score: 89},
          {description:'nice',id: 12, name: 'papa', score: 100},
          {description:'nice',id: 13, name: 'apple', score: 99},
          {description:'nice',id: 14, name: 'banana', score: 100},
          {description:'nice',id: 15, name: 'orange', score: 98},
          {description:'nice',id: 16, name: 'juice', score: 96},
          {description:'nice',id: 17, name: 'bubble', score: 89},
          {description:'nice',id: 18, name: 'papa', score: 100},
        ],
        selectedList: []
      }
    },
    methods: {
      showToast(direction) {
        this.$toast({
          message: 'message',
          position: direction
        })
      },
      x(obj) {
        let filterRes = this.selectedList.filter(item => item.id === obj.item.id);
        if (obj.selected) {
          if (filterRes.length === 0) {
            this.selectedList.push(obj.item)
          }
        } else {
          if (filterRes.length > 0) {
            let index = this.selectedList.indexOf(obj.item);
            this.selectedList.splice(index, 1);
          }
        }
      },
      findAndSplice(data, ...fns) {
        fns.reduce((prev, cur) => {
          return cur(prev(data));
        }, fns[0])
      }
    },
    created() {

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
        &:not(:last-child) {
            margin-bottom: 20px;
        }
        &-table{
            height: 400px;
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

    .basic-input-demo {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }

    .title {
        text-align: center;
        padding: 0;
        margin: 0 0 16px 0;
    }

    .toast-btn {
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }

    .box {
        /*width: 200px;*/
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid crimson;
    }

    .sticky-content {
        border: 1px solid crimson;
    }
</style>
