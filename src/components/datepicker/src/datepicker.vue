<template>
    <div class="w-datapicker" v-xxx>
        <w-input v-model="selectedDate" @focus="openPanel"></w-input>
        <div class="w-datapicker-panel" v-if="visible">
            <div class="w-datapicker-panel__header">
                <span class="control" @click="prevYear"><<</span>
                <span class="control" @click="prevMonth"><</span>
                <div class="current-date">{{formatDate(date)}}</div>
                <span class="control" @click="nextMonth">></span>
                <span class="control" @click="nextYear">>></span>
            </div>
            <div class="w-datapicker-panel__body">
                <table class="w-datapicker-table" cellspacing="0" cellpadding="0">
                    <thead class="w-datapicker-table__header">
                    <tr>
                        <th v-for="week in weeks">
                            {{week}}
                        </th>
                    </tr>
                    </thead>
                    <tbody class="w-datapicker-table__body" @click="testClick">
                    <tr class="w-datapicker-table__row" v-for="row in 6" :key="`row-${row}`">
                        <td
                                v-for="col in 7"
                                :key="`col-${col}`"
                                :class="{
                                notDateOfCurMonth:!isDateOfCurMonth(dates[(row-1)*7+(col-1)]),
                                isSelectedDate:isSelectedDate(dates[(row-1)*7+(col-1)]),
                                disabled:isDisabledDate(dates[(row-1)*7+(col-1)])
                                }"
                        >
                            <div>
                                <span :data-index="`${row}-${col}`">{{dates[(row-1)*7+(col-1)].getDate()}}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import WInput from '../../input/src/input';
  import * as dateUtils from '../../../utils/date';

  export default {
    name: "WDatepicker",
    components: {
      WInput
    },
    directives:{
        xxx:{
          bind(el,binding,vnode){
            let handler = (evt)=>{
              if (el.contains(evt.target)){
                vnode.context.openPanel()
              }else {
                vnode.context.closePanel()
              }
            };
            document.addEventListener('click',handler);
            vnode.handler = handler
          },
          inserted(el,binding,vnode){
           console.log(vnode)
          },
          unbind(el,binding,vnode){
            document.removeEventListener('click',vnode.handler)
          }
        }
    },
    props: {
      weeks: {
        type: Array,
        default: () => ["日", "一", "二", "三", "四", "五", "六"],
        validator: (newValue) => newValue.length === 7
      },
      disabledDate: {
        type: Function,
        default: time => {
          return time.getTime() > dateUtils.getLastDate(new Date()).getTime()
        },
        validator: (v) => {
          if (typeof v !== 'function') {
            console.error('disabledDate needs a function')
            return false;
          }
          return true;
        }
      }
    },
    data() {
      return {
        date: new Date(),
        selectedDate: '',
        visible:true
      }
    },
    model: {
      prop: 'checked',
      event: 'click'
    },
    computed: {
      dates() {
        // 基于时间戳进行计算，在node环境下运行会存在差异
        //42个日期，每行7列
        let year = this.date.getFullYear();

        let month = this.date.getMonth();
        // 获取当前月份的第一天
        let firstDateOfCurrentMonth = new Date(year, month, 1);
        //获取当前月份的第一天星期，该数字有：周三数字3可以表示在其前面有3天
        let week = firstDateOfCurrentMonth.getDay();

        let startDateTimestamp = firstDateOfCurrentMonth - week * 24 * 60 * 60 * 1000;

        let dates = [];

        for (let i = 0; i < 42; i++) {
          dates.push(new Date(startDateTimestamp + i * 24 * 60 * 60 * 1000))
        }
        // 一维数组转换二维数组的方法
        // for (let i = 0; i < 6; i++) {
        //   for (let j = 0; j < 7; j++) {
        //     console.log(i * 7 + j)
        //   }
        // }
        return dates;
      }
    },
    methods: {
      closePanel(){
        this.visible = false;
      },
      openPanel(){
        this.visible = true;
      },
      testClick(evt) {
        if (evt.target.tagName === 'SPAN') {
          let index = evt.target.dataset.index.split('-');
          let row = parseInt(index[0]);
          let col = parseInt(index[1]);
          let selIndex = (row - 1) * 7 + (col - 1);
          let date = this.dates[selIndex];
          if (this.isDisabledDate(date)) {
            return;
          }
          this.date = date;
          this.selectedDate = this.fullFormatDate(this.date);

          this.$emit('change', this.date);
        }
      },
      isDisabledDate(date) {
        return this.disabledDate(date)
      },
      isSelectedDate(date) {
        return this.selectedDate === this.fullFormatDate(date);
      },
      selectDate(date) {
        this.selectedDate = this.fullFormatDate(date);
        this.date = date;
        this.$emit('change', date);
      },
      nextYear() {
        let {year, month} = this.getYearMonthDay(this.date);
        this.date = new Date(year + 1, month, 1)
      },
      nextMonth() {
        let {year, month} = this.getYearMonthDay(this.date);
        this.date = new Date(year, month + 1, 1);
      },
      prevMonth() {
        let {year, month} = this.getYearMonthDay(this.date);
        this.date = new Date(year, month - 1, 1);
      },
      prevYear() {
        let {year, month} = this.getYearMonthDay(this.date);
        this.date = new Date(year - 1, month, 1);
      },
      isDateOfCurMonth(date) {
        const {year, month} = this.getYearMonthDay(date);
        const {year: cYear, month: cMonth} = this.getYearMonthDay(this.date);
        return year === cYear && month === cMonth;
      },
      fullFormatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      formatDate(date) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月`
      }
      ,
      getYearMonthDay(date) {
        return {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()}
      }
      ,
      getDate(year, month, day) {
        return new Date(year, month, day);
      },
      getLastDate(date) {
        return new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1) - 24 * 60 * 60 * 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-datapicker {
        display: inline-block;
        position: relative;
        font-size: 12px;
        &-panel {
            position: absolute;
            left: 0;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
            &__header {
                margin: 12px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .control {
                    padding: 0 10px;
                    cursor: pointer;
                    transition: all 0.2s linear;
                    &:hover {
                        color: lightgreen;
                    }
                }
                .current-date {
                    flex: 1;
                    text-align: center;
                }
            }
            &__body {
                margin: 12px;
            }
        }
        &-table {
            &__header {
                th {
                    padding: 5px;
                    color: #606266;
                    font-weight: 400;
                    border-bottom: 1px solid #ebeef5;
                }
            }
            &__body {
                td {
                    height: 30px;
                    width: 32px;
                    text-align: center;
                    cursor: pointer;
                    padding: 4px 0;
                    transition: all 0.2s linear;
                    user-select: none;
                    &.notDateOfCurMonth {
                        color: #cccccc;
                    }
                    > div {
                        height: 30px;
                        padding: 3px 0;
                        box-sizing: border-box;
                        > span {
                            width: 24px;
                            height: 24px;
                            display: block;
                            margin: 0 auto;
                            line-height: 24px;
                            border-radius: 50%;
                        }
                    }
                    &.isSelectedDate {
                        > div {
                            > span {
                                color: #fff;
                                background-color: #409eff;
                            }
                        }
                    }
                    &.disabled {
                        cursor: not-allowed;
                    }
                    &:hover {
                        color: lightgreen;
                    }
                }
            }
        }
    }
</style>