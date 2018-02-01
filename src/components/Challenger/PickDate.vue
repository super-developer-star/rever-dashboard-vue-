<template>
  <div class="pick-date-range" v-clickoutside="closePopup">
    <div class="start-date">
      <input readonly
             class="input"
             :value="startDateText"
             @click="openStartDatePopup"
             @mousedown="$event.preventDefault()"
             placeholder="Select Start Date"/>
      <i class="input-icon glyphicon glyphicon-triangle-bottom" @click="openStartDatePopup" ></i>
    </div>
    <div class="end-date">
      <input readonly
             class="input"
             :value="endDateText"
             @click="openEndDatePopup"
             @mousedown="$event.preventDefault()"
             placeholder="Select End Date" />
      <i class="input-icon glyphicon glyphicon-triangle-bottom" @click="openEndDatePopup" ></i>
    </div>
    <div class="clearfix"></div>
    <div class="picker-popup" v-show="showPopup">
      <Calendar v-model="rangesValue" :show="showPopup" :showDate="showDate"></Calendar>
    </div>
  </div>
</template>

<script>
  import Calendar from './Calendar.vue'
  export default {
    components: { Calendar },
    props: {
      format: {
        type: String,
        default: 'dd/MM/YYYY'
      }
    },
    data () {
      return {
        showPopup: false,
        rangesValue: [],
        showDate: null,
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    },
    watch: {
      rangesValue (val) {
        this.rangesValue = val
      }
    },
    computed: {
      startDateText () {
        if (this.rangesValue && this.rangesValue[0]) {
          return this.rangesValue[0] ? this.stringify(this.rangesValue[0]) : ''
        }
        return ''
      },
      endDateText () {
        if (this.rangesValue && this.rangesValue[1]) {
          return this.rangesValue[0] ? this.stringify(this.rangesValue[1]) : ''
        }
        return ''
      }
    },
    methods: {
      closePopup () {
        this.showPopup = false
        this.rangesValue = this.isValidRange(this.rangesValue) ? this.rangesValue : [null, null]
      },
      openStartDatePopup () {
        this.showPopup = true
        this.showDate = this.rangesValue[0] ? this.rangesValue[0] : null
      },
      openEndDatePopup () {
        this.showPopup = true
        this.showDate = this.rangesValue[1] ? new Date(this.rangesValue[1].getFullYear(), (this.rangesValue[1].getMonth() - 1), this.rangesValue[1].getDate()) : null
      },
      formatDate (date, fmt) {
        const map = {
          'M+': date.getMonth() + 1,
          '[Dd]+': date.getDate(),
          '[Hh]+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }
        let str = fmt.replace(/[Yy]+/g, function (str) {
          return ('' + date.getFullYear()).slice(4 - str.length)
        })
        Object.keys(map).forEach((key) => {
          str = str.replace(new RegExp(key), function (str) {
            const value = '' + map[key]
            return str.length === 1 ? value : ('00' + value).slice(value.length)
          })
        })
        return str
      },
      stringify (date) {
        return this.formatDate(new Date(date), this.format)
      },
      isValidDate (date) {
        return !!new Date(date).getTime()
      },
      isValidRange (date) {
        return Array.isArray(date) &&
          date.length === 2 &&
          this.isValidDate(date[0]) &&
          this.isValidDate(date[1])
      }
    },
    directives: {
      clickoutside: {
        bind (el, binding, vnode) {
          el['@clickoutside'] = (e) => {
            if (!el.contains(e.target) && binding.expression && vnode.context[binding.expression]) {
              binding.value()
            }
          }
          document.addEventListener('click', el['@clickoutside'], true)
        },
        unbind (el) {
          document.removeEventListener('click', el['@clickoutside'], true)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styleConfig.less';

  .pick-date-range {
    position: relative;
    display: inline-block;
    color:#73879c;
    font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", sans-serif;

    * {
      box-sizing: border-box;
    }

    .start-date, .end-date{
      position: relative;
      float: left;
      width: 50%;
    }

    .start-date{
      padding-right: 5px;

      .input-icon {
        right: 5px;
      }
    }

    .end-date{
      padding-left: 5px;

      .input-icon {
        right: 0;
      }
    }

    .input {
      display: inline-block;
      width: 100%;
      height: 34px;
      padding: 6px 30px 6px 10px;
      font-size: 12px;
      line-height: 1.2;
      color: @white-font;
      background-color: #a4adbd;
      border: 1px solid #a4adbd;
      border-radius: 2px;
    }

    .input::-webkit-input-placeholder{
      color: @white-font;
    }
    .input::-moz-placeholder{
      color: @white-font;
    }

    .input-icon {
      position: absolute;
      width: 30px;
      height: 100%;
      color: @secondary-blue;
      text-align: center;
      font-style: normal;
    }

    .input-icon::after{
      content:'';
      display: inline-block;
      width: 0;
      height: 100%;
      vertical-align: middle;
    }

    .clearfix:after, .clearfix:before{
      display: table;
      content: " ";
    }

    .picker-popup{
      position: absolute;
      color: @gray-font;
      width: 496px;
      margin-top: 1px;
      border: 1px solid #d9d9d9;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.75);
      z-index: 1000;
    }
  }

  .picker-top {
    margin: 0 12px;
    line-height: 34px;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
    text-align: center;
  }
</style>
