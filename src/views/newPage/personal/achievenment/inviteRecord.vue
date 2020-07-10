<template>
  <div class="inviteRecord">
    <div class="navbar">
      <van-nav-bar
        title="会员新增记录"
        left-arrow
        @click-left="$router.push('/achievenment')"
      />
    </div>
    <div class="pic shadowBox">
      <div style="width:13.8rem;height:8.24rem;" ref="chart"></div>
    </div>
    <div class="detail">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="本月收益统计" name="1">
          <template #value>
            <span style="color: #ED001A">总计：30</span>
          </template>
          <van-cell title="下级订单返佣" value="+5.25" label="2019-01-28 15：00：00" v-for="i in 6" :key="i" />
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
    export default {
        name: "inviteRecord",
      data() {
        return {
          activeNames:['1']
        }
      },
      methods: {
        initCharts () {
          let myChart = this.$echarts.init(this.$refs.chart);
          let time = new Date()
          let month = time.getMonth()+1
          let day = time.getDate()
          // 当天
          let atTime = month+'.'+day
          // 前6天
          let xTime = []
          // 处理x轴的时间显示
          for (let i = 0; i < 6; i++) {
            if (month===1||month===3||month===5||month===7||month===8||month===10||month===12) { //大月
              // 当天数为6天以下时就得换月
              if (day < 6) {
                // 当减到0时，换月变天
                if (month !== 3) {
                  if (day === 0) {
                    if (month === 8) { //八月转七月
                      month -= 1
                      xTime[i] = month+'.'+(day = 31)
                    } else if (month === 1) {  // 一月转十二月
                      month = 12
                      xTime[i] = month+'.'+(day = 31)
                    } else {
                      month -= 1
                      xTime[i] = month+'.'+(day = 30)
                    }
                  } else { // 大于0
                    xTime[i] = month+'.'+(day -= 1)
                  }
                } else { // 二月的情况
                  if (day === 0) {
                    month -= 1
                    xTime[i] = month+'.'+(day = 29)
                  } else { // 大于0
                    xTime[i] = month+'.'+(day -= 1)
                  }
                }
              } else {
                xTime[i] = month+'.'+(day -= 1)
              }
            } else { // 小月
              // 当天数为6天以下时就得换月
              if (day < 6) { // 2 4 6 9 11
                // 当减到0时，换月变天
                if (day === 0) { // 小月转大月
                  month -= 1
                  xTime[i] = month+'.'+(day = 31 - 1)
                } else { // 大于0
                  xTime[i] = month+'.'+(day -= 1)
                }

              } else {
                xTime[i] = month+'.'+(day -= 1)
              }
            }
          }
          let option = {
            title: {
              text: '分数',
              textStyle: {
                fontWeight:500,
                color: '#999999',
              },
            },
            // 显示网格
            grid: {
              show: true
            },
            xAxis: {
              type: 'category',
              // x轴时间轴
              data: [ xTime[4], xTime[3], xTime[2], xTime[1], xTime[0], atTime],
              position: 'top',
              spiltLine:{
                show:true  //想要不显示网格线，改为false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show:false
              }
            },
            yAxis: {
              type: 'value',
              data: [20, 40, 60, 80, 100],
              spiltLine:{
                show:true  //想要不显示网格线，改为false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show:false
              }
            },
            // 全局字体样式
            textStyle: {
              color: '#999999',
            },
            series: [{
              data: [2, 7, 45, 56, 66,88],
              type: 'line'
            }]
          };
          // 绘制图表
          myChart.setOption(option);

        }
      },
      mounted() {
          this.initCharts()
      }
    }
</script>

<style scoped>
  .pic {
    width: 13.8rem;
    height: 8.24rem;
    margin: 0.4rem auto;
    text-align: center;
    line-height: 8.24rem;
  }
</style>
