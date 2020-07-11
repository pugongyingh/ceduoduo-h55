<template>
    <div class="rankList">
      <div class='title-wrapper'>
        <van-icon name='arrow-left' @click='back'></van-icon>
      </div>
      <div class="rankListBody">
        <div class="top">
          <p>排行榜</p>
          <img src="../../../assets/newImages/huizhang.png" alt="">
        </div>
        <div class="rank">
          <div class="title" v-if='contestDetailData.phase !== "已结束"'>
            <p></p>
            <div class="text">比赛倒计时</div>
            <div class="time">
              <span>{{day}}<sub>天</sub></span>
              <span>:</span>
              <span>{{hour &gt;= 10 ? hour : '0' + hour}}</span>
              <span>:</span>
              <span>{{minute &gt;= 10 ? minute : '0' + minute}}</span>
              <span>:</span>
              <span>{{second &gt;= 10 ? second : '0' + second}}</span>
            </div>
            <div class="text">后结束</div>
            <p></p>
          </div>
          <div class="title" v-else>
            <p></p>
            <div class="text">比赛已结束</div>
            <p></p>
          </div>
          <div class="r_body" v-if='rankData.length > 0'>
            <div class="r_li" v-for="(item, index) in rankData" :key='index'>
              <div class="reward-img" v-if='index === 0'>
                <img src="../../../assets/newImages/_s-c1_charts_ic_first.png" alt="">
              </div>
              <div class="reward-img" v-if='index === 1'>
                <img src="../../../assets/newImages/_s-c1_charts_ic_second.png" alt="">
              </div>
              <div class="reward-img" v-if='index === 2'>
                <img src="../../../assets/newImages/_s-c1_charts_ic_third.png" alt="">
              </div>
              <div class="reward-img" v-if='index > 2'>
                <span class='reward-num'>{{index + 1}}</span>
              </div>
              <div class="avatar">
                <img :src="item.userAvatar" alt="">
              </div>
              <div class="info">
                <span>{{item.userName}}</span>
                <span>编号：{{item.contestAlbumId}}</span>
              </div>
              <div class="vote">
                <span>{{item.voteQuatity}}票</span>
              </div>
            </div>
          </div>
          <div class='r_body' v-else>
            <van-empty description="暂无数据"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { getById } from '@/services/contest.js'
  import { findByContestIdAndStoreId } from '@/services/contestAlbum.js'
  export default {
    name: "rankList",
    data() {
      return {
        interval: null,
        endAt: '',
        hour: 0,
        day: 0,
        minute: 0,
        second: 0,
        contestId: 0,
        contestDetailData: {},
        rankData: [],
        // 票数数组
        voteArr: []
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      getContestData(id) {
        getById({id}, res => {
          this.endAt = res.endAt
          this.contestDetailData = res
        })
      },
      getTime() {
        if (this.contestDetailData.phase === "已结束") {
          clearInterval(this.interval)
        }
        let now = new Date(Date.now()).getTime()
        // 时间差值(剩余时间)
        let surplusTime = new Date(this.endAt).getTime() - now
        this.day = Math.floor(surplusTime/1000/60/60/24);
        this.hour = Math.floor(surplusTime/1000/60/60%24);
        this.minute = Math.floor(surplusTime/1000/60%60);
        this.second = Math.floor(surplusTime/1000%60);
      },
      // 获取排名数据
      getRank(id) {
        findByContestIdAndStoreId({contestId: id}, res => {
          this.rankData = res.sort((a, b) => b.voteQuatity - a.voteQuatity)
        })
      }
    },
    created() {
      this.contestId = this.$route.params.id

      this.getContestData(this.contestId)
      this.getRank(this.contestId)

      this.interval = setInterval(() => {
        this.getTime()
      }, 1000)
    }
  }
</script>

<style lang="less" scoped>
.rankList {
  .title-wrapper {
    position: relative;
    height: 1.76rem;
    .van-icon {
      position: absolute;
      top: 50%;
      left: 0.6rem;
      transform: translateY(-50%);
    }
  }
  .rankListBody {
    background-image: url("../../../assets/newImages/11.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 40rem;
    .top {
      height:3.02rem;
      display: flex;
      justify-content: space-between;
      p {
        line-height:3.02rem;
        display: inline-block;
        font-size: 1.12rem;
        font-weight: bold;
        color:rgba(51,51,51,1);
        margin-left: 0.54rem;
      }
      img {
        width:2.26rem;
        height:3.02rem;
        margin-right: 1.94rem;
      }
    }
    .rank {
      padding: 0.5rem 0.6rem;
      position: relative;
      .title {
        display: flex;
        height: 1.8rem;
        justify-content: center;
        align-items: center;
        background-image: url("../../../assets/newImages/henggan.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        p {
          width:0.44rem;
          height:0.08rem;
          background:white;
          display: inline-block;
        }
        .text {
          display: inline-block;
          height:0.82rem;
          font-size:0.56rem;
          font-family:PingFang;
          font-weight:bold;
          letter-spacing: 2px;
          color:white;
        }
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            &:first-child {
              width: 1rem;
            }
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .0625rem;
            margin: 0 0.12rem;
            text-align: center;
            width: 0.9rem;
            height: 0.9rem;
            background-color:rgba(248,178,58,1);
            border-radius: 50%;
            font-size: 0.4rem;
            font-family: PingFang;
            font-weight: 500;
            color:rgba(255,255,255,1);
          }
          span:nth-child(2n){
            color:rgba(255,255,255,1);
            width:0.01rem;
            background-color: transparent;
          }
        }
      }
      .r_body {
        position: absolute;
        top: 2rem;
        left: 1.2rem;
        width: 12.5rem;
        height: 12rem;
        background-color: #FFFFFF;
        border-radius: 2px 2px 0 0;
        .r_li {
          display: flex;
          margin: 0.5rem 0.2rem;
          .reward-img {
            width: 1.98rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 0.88rem;
              height: 0.88rem;
            }
            .reward-num {
              font-size:0.48rem;
              font-family:BerlinSansFBDemi;
              font-weight:bold;
            }
          }
          .avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width:1.8rem;
              height:1.8rem;
              border-radius:8px;
            }
          }
          .info {
            width: 5.5rem;
            display: flex;
            flex-direction: column;
            margin-left: 0.5rem;
            span {
              display: inline-block;
              height: 0.84rem;
              font-size:0.56rem;
              font-family:PingFang;
              font-weight:bold;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
            }
            span:last-child {
              display: inline-block;
              height: 0.84rem;
              font-size:0.56rem;
              font-family:PingFang;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
            }
          }
          .vote {
            span {
              font-size:0.48rem;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(248,178,58,1);
              line-height:0.84rem;
            }
          }
        }
      }
    }
  }
}
</style>
