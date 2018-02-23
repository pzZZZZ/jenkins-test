<template>
  <div class="time-box">
    <div class="content">
      <div class="date-year">
        <span @click="changeYear('-')">
          <</span> {{year}}
            <span @click="changeYear('-')">
              ></span>
      </div>
      <div class="date-month">
        <span @click="changeMonth('-')">
          <</span>

            {{month}}
            <span @click="changeMonth('+')">></span>
      </div>
      <div class="header">
        <ul>
          <li v-for="(item,index) in week">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="time">
        <ul>
          <template v-for="(item,index) in dateList">
            <li :class="item.time==nowDay?'act':''" @click="changeLi(item.time)">
              <span>{{item.time}}</span>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import conso from '../mixins/consoleMixin'
export default {
  data() {
    return {
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      dateList: 0,
      nowDay: 0,
      month: 0,
      year: 0
    };
  },
  created() {
    this.getNowYear();
  },
  mixins:[conso],
  mounted() {},
  methods: {
    changeYear(dir) {
      if (dir === "-") {
        this.year--;
      } else {
        this.year++;
      }
      this.getNowYear();
    },
    changeMonth(dir) {
      if (dir === "-") {
        if (this.month > 1) {
          this.month--;
        } else {
          this.year--;
          this.month = 12;
        }
      } else {
        if (this.month < 12) {
          this.month++;
        } else {
          this.year++;
          this.month = 1;
        }
      }
      this.getNowYear();
    },
    changeLi(i) {
      if (i == 0) {
        return false;
      }
      this.nowDay = i;
    },
    act() {
      return "act";
    },
    getNowYear() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      if (this.month == 0) {
        this.month = month;
      }
      if (this.year == 0) {
        this.year = year;
      }
      month = this.month;
      year = this.year;
      let alldays = this.getDaysInOneMonth(year, month);
      let arr = [];
      let week = this.getFirstWeek(year, month);
      for (let i = 1; i < alldays + week; i++) {
        if (i < week) {
          arr.push({ time: "" });
        } else {
          arr.push({ time: i + 1 - week });
        }
      }
      this.dateList = arr;
      if (this.nowDay != 0) {
        this.year = year;
      } else {
        let nowDay = this.getnowDay();
        this.nowDay = nowDay;
      }

      //   console.log(alldays);
    },
    getDaysInOneMonth(year, month) {
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    getFirstWeek(year, month) {
      let firatDay = new Date(year, month - 1, 1);
      if (firatDay.getDay() == 0) {
        return 7;
      }
      return firatDay.getDay();
    },
    getnowDay() {
      let day = new Date();
      return day.getDate();
    }
  }
};
</script>
<style lang="scss" scoped>
.time-box {
  display: flex;
  justify-content: center;
}
.content {
  width: 300px;
  .date-year {
    text-align: center;
  }
  .date-month {
    text-align: center;
  }
  .header {
    border: 1px solid #eee;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 30px;
        font-size: 14px;
      }
    }
  }
  .time {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        width: 42px;
        font-size: 14px;
        text-align: center;
        span {
        }
      }
      .act {
        background: red;
      }
    }
  }
}
</style>


