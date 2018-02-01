<template>
  <div class="calendar">
    <div class="calendar-header">
      <div style="width: 50%; float: left">
      <i class="calendar__prev-icon" @click="changeMonth(-1)">&lsaquo;</i>
      <span>{{months[now.getMonth()]}}</span> <span>{{now.getFullYear()}}</span>
      </div>
      <div style="width: 50%; float: left">
         <span>{{months[(now.getMonth() + 1) % 12]}}</span> <span>{{now.getFullYear()}}</span>
      <i class="calendar__next-icon" @click="changeMonth(1)" >&rsaquo;</i>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="calendar-content">
      <table class="calendar-table">
        <thead>
        <tr>
          <th v-for="day in days">{{day}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in dates">
          <template v-for="cell in row" v-if="(cell.classes !== 'lastMonth') && (cell.classes !== 'nextMonth')">
            <td :title="cell.title"
                :class="getClasses(cell)"
                @click="selectDate(cell)">{{cell.day}}</td>
          </template>
          <template v-else>
            <td></td>
          </template>

        </tr>
        </tbody>
      </table>
      <table class="calendar-table">
        <thead>
        <tr>
          <th v-for="day in days">{{day}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in next_dates">
          <template v-for="cell in row" v-if="(cell.classes !== 'lastMonth') && (cell.classes !== 'nextMonth')">
            <td :title="cell.title"
                :class="getClasses(cell)"
                @click="selectDate(cell)">{{cell.day}}</td>
          </template>
          <template v-else>
            <td></td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: null,
      showDate: null,
      show: Boolean
    },
    data () {
      return {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dates: [],
        next_dates: [],
        now: new Date(),
        startAt: null,
        endAt: null
      }
    },
    created () {
      this.updateCalendar()
    },
    watch: {
      show (val) {
        if (val) {
          this.startAt = this.value[0]
          this.endAt = this.value[1]
          this.updateNow()
        }
        else {
          this.startAt = null
          this.endAt = null
        }
      },
      showDate: {
        handler: 'updateNow',
        immediate: true
      },
      now: 'updateCalendar'
    },
    methods: {
      updateNow () {
        let now = this.showDate ? new Date(this.showDate) : new Date()
        now.setDate(1)
        this.now = now
      },
      updateCalendar () {
        function getCalendar (time, firstday, length, classes) {
          return Array.apply(null, { length }).map((v, i) => { // eslint-disable-line
            let day = firstday + i
            const date = new Date(time.getFullYear(), time.getMonth(), day)
            return {
              title: date.toLocaleDateString(),
              date,
              day,
              classes
            }
          })
        }

        function getDates (time) {
          time.setDate(0)
          const lastMonthLength = time.getDay() + 1
          const lastMonthfirst = time.getDate() - (lastMonthLength - 1)
          const lastMonth = getCalendar(time, lastMonthfirst, lastMonthLength, 'lastMonth')
          time.setMonth(time.getMonth() + 2, 0)
          const curMonthLength = time.getDate()
          const curMonth = getCalendar(time, 1, curMonthLength, 'curMonth')
          time.setMonth(time.getMonth() + 1, 1)
          const nextMonthLength = 42 - (lastMonthLength + curMonthLength)
          const nextMonth = getCalendar(time, 1, nextMonthLength, 'nextMonth')

          let index = 0
          let resIndex = 0
          const arr = lastMonth.concat(curMonth, nextMonth)
          const result = new Array(5)
          while (index < 35) {
            result[resIndex++] = arr.slice(index, index += 7)
          }
          return result
        }

        this.dates = getDates(new Date(this.now))
        this.next_dates = getDates(new Date(this.now.getFullYear(), (this.now.getMonth() + 1), this.now.getDay()))
      },
      getClasses (cell) {
        const classes = []
        const cellTime = cell.date.getTime()
        const startTime = this.startAt ? new Date(this.startAt).setHours(0, 0, 0, 0) : 0
        const endTime = this.endAt ? new Date(this.endAt).setHours(0, 0, 0, 0) : 0
        const today = new Date().setHours(0, 0, 0, 0)
        classes.push(cell.classes)
        if (cellTime === today) {
          classes.push('today')
        }
        // range classes
        if (startTime && endTime) {
          if (cellTime === startTime) {
            classes.push('startTime')
          }
          else if (cellTime === endTime) {
            classes.push('endTime')
          }
          else if (startTime < cellTime && cellTime < endTime) {
            classes.push('inrange')
          }
        }
        else if (startTime && cellTime === startTime) {
          classes.push('startTime')
        }
        return classes.join(' ')
      },
      changeYear (flag) {
        const now = new Date(this.now)
        now.setFullYear(now.getFullYear() + flag)
        this.now = now
      },
      changeMonth (flag) {
        const now = new Date(this.now)
        now.setMonth(now.getMonth() + flag)
        this.now = now
      },
      selectDate (cell) {
        const cellTime = cell.date.getTime()
        const startTime = this.startAt ? new Date(this.startAt).setHours(0, 0, 0, 0) : 0
        if (cellTime < startTime || (this.startAt && this.endAt)) {
          this.startAt = cell.date
          this.endAt = null
        }
        else if (this.startAt) {
          this.endAt = cell.date
        }
        else {
          this.startAt = cell.date
        }
        this.$emit('input', [this.startAt, this.endAt])
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styleConfig.less';
  @inrange-background: #d0dde6;
  @current-background: #4f5d7c;

  .calendar {
    float: left;
    padding: 6px 12px;
  }

  .calendar * {
    box-sizing: border-box;
  }
  .calendar-header {
    line-height: 34px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .calendar__next-icon,
  .calendar__prev-icon {
    position: absolute;
    font-style: normal;
    font-size: 20px;
    padding: 0 6px;
    cursor: pointer;
  }
  .calendar__next-icon:hover,
  .calendar__prev-icon:hover {
    color: #1284e7;
  }
  .calendar__prev-icon {
    left: 10px;
  }
  .calendar__next-icon {
    right: 10px;
  }
  .calendar-table {
    float: left;
    width: 50%;
    font-size: 12px;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .calendar-table:first-child {
    border-right: 1px solid #cccccc;
  }
  .calendar-table td,
  .calendar-table th {
    width: 32px;
    height: 32px;
    text-align: center;
  }
  .calendar-table td.curMonth {
    cursor: pointer;
  }

  .calendar-table td.inrange{
    background-color: @inrange-background;
  }
  .calendar-table td.curMonth:hover{
    background-color: @inrange-background;
  }
  .calendar-table td.startTime:hover, .calendar-table td.endTime:hover{
    background-color: @current-background;
  }
  .calendar-table td.startTime {
    color: #fff;
    background-color: @current-background;
    border-radius: 50% 0 0 50%;
  }

  .calendar-table td.endTime{
    color: #fff;
    background-color: @current-background;
    border-radius: 0 50% 50% 0;
  }

  .lastMonth,
  .nextMonth {
    color: #c7c7c7;
  }
  .today {
    color: #20a0ff;
  }
</style>
