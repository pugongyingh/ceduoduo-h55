<template>
    <div class="rankList">
      <van-nav-bar
        title=""
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="rankListBody">
        <div class="top">
          <p>排行榜</p>
          <img src="../../../assets/newImages/huizhang.png" alt="">
        </div>
        <div class="rank">
          <div class="title">
            <p></p>
            <div class="text">比赛倒计时</div>
            <div class="time">
              <span>23</span>
              <span>:</span>
              <span>23</span>
              <span>:</span>
              <span>23</span>
            </div>
            <div class="text">后结束</div>
            <p></p>
          </div>
<!--          排行-->
          <div class="r_body">
            <div class="r_li" v-for="item in 3">
              <div class="img">
                <img src="../../../assets/newImages/_s-c1_charts_ic_first.png" alt="">
<!--                <img src="../../../assets/newImages/_s-c1_charts_ic_second.png" alt="">-->
<!--                <img src="../../../assets/newImages/_s-c1_charts_ic_third.png" alt="">-->
              </div>
              <div class="img">
                <img src="../../../assets/newImages/daka.jpg" alt="">
              </div>
              <div class="img">
                <span>用户昵称</span>
                <span>编号：111</span>
              </div>
              <div class="img">
                <span>88888票</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "rankList"
    }
</script>

<style lang="less" scoped>
.rankList {

  .rankListBody {
    height: 80rem;
    background-image: url("../../../assets/newImages/11.png");
    background-size: 100% 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    .top {
      height:3.02rem;
      display: flex;
      justify-content: space-between;
      p {
        line-height:3.02rem;
        display: inline-block;
        font-size:1.12rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-left: 0.54rem;
      }
      img {
        width:2.26rem;
        height:3.02rem;
        box-shadow:0px 8px 13px 0px rgba(255,186,55,0.44);
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
            display: inline-block;
            margin: 0 0.12rem;
            text-align: center;
            width:0.64rem;
            height:0.64rem;
            background:rgba(248,178,58,1);
            border-radius:50%;
            font-size:0.4rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(255,255,255,1);
          }
          span:nth-child(2),span:nth-child(4) {
            color:rgba(248,178,58,1);
            width:0.01rem;
            background:rgba(237,0,26,1);
          }
        }
      }
      .r_body {
        position: absolute;
        top: 2rem;
        left: 1.1rem;
        width: 12.78rem;
        height: 12rem;
        background-color: #FFFFFF;
        .r_li {
          display: flex;
          margin: 0.5rem 0.2rem;
          .img:nth-child(1) {
            width: 1.98rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 0.88rem;
              height: 0.88rem;
            }
          }
          .img:nth-child(2) {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width:1.8rem;
              height:1.8rem;
              border-radius:8px;
            }
          }
          .img:nth-child(3) {
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
          .img:nth-child(4) {
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
