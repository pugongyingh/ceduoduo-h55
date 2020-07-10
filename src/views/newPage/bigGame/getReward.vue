<template>
  <div class="getReward">
    <van-nav-bar
      title="比赛名称"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="rewardBody">
      <div class="rewardList" v-for="item in 2">
        <div class="top">
          <span></span>
          <div class="t_r">一等奖</div>
          <span></span>
        </div>
        <div class="contain">
          <div class="rewWarder" v-for="item in 2">
            <div class="img">
              <img src="../../../assets/newImages/daka.jpg" alt="">
            </div>
            <div class="info">
              <span>用户名称aaa</span>
              <span>编号1111111</span>
              <div class="name">
                <img src="../../../assets/newImages/logo.png" alt="">
                <span>店铺名称</span>
              </div>
              <div class="vote">
                <span>999999票</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "getReward"
    }
</script>

<style lang="less" scoped>
.getReward {

  .rewardBody {

    .rewardList {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .top {
        margin-top: 0.4rem;
        width:13.98rem;
        height:1.82rem;
        background:rgba(255,255,255,1);
        box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:0.42rem;
        text-align: center;
        span {
          display: inline-block;
          width:0.32rem;
          height:0.32rem;
          background:rgba(248,178,58,1);
          border-radius:50%;
        }
        .t_r{
          display: inline-block;
          height:0.84rem;
          padding-top: 0.4rem;
          font-size:0.64rem;
          font-family:PingFang;
          font-weight:bold;
          color:rgba(237,0,26,1);
          margin: 0 1rem;
        }
      }
      .contain {
        padding: 0 0.4rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .rewWarder {
          margin: 0.4rem 0.1rem;
          width:6.8rem;
          height:12.88rem;
          background:rgba(255,255,255,1);
          border-radius:0.16rem;
          display: inline-block;
          .img {
            width:6.8rem;
            height:9rem;
            img {
              width:6.8rem;
              height:9rem;
              border-radius:8px 8px 0px 0px;
            }
          }
          .info {
            display: flex;
            flex-direction: column;

            span:nth-child(1) {
              height:0.84rem;
              font-size:0.56rem;
              font-family:PingFang;
              font-weight:500;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
              text-align: center;
            }
            span:nth-child(2) {
              text-align: center;
              height:0.42rem;
              font-size:0.4rem;
              font-family:PingFang;
              font-weight:500;
              color:rgba(248,178,58,1);
              line-height:0.42rem;
            }

            .name {
              text-align: center;
              display: flex;
              justify-content: center;
              margin: 0.4rem 0;
              img {
                width:0.72rem;
                height:0.72rem;
                border-radius:50%;
              }
              span {
                height:0.4rem;
                font-size:0.4rem;
                font-family:PingFang;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:0.84rem;
                margin: 0 0.4rem;
              }
            }

            .vote {
              display: flex;
              justify-content: center;
              span {
                display: inline-block;
                width:4.68rem;
                height:0.84rem;
                background:rgba(237,0,26,1);
                border-radius:0.16rem;
                font-size:0.44rem;
                font-family:PingFang;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:0.84rem;
              }
            }
          }
        }
      }
    }

  }
}
</style>
