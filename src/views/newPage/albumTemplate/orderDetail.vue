<template>
  <div class="orderDetail">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">订单详情</div>
    </div>

    <div class="round-wrap time-left">
      <span class="title">待付款</span>
      <span style="color: #999999; font-size:0.52rem; font-weight: 500;">剩{{timeLeft}}自动关闭</span>
    </div>

    <van-row class="round-wrap temp-info">
      <van-col :span="8">
        <img class="temp-pic" src="../../../assets/images/b5_ic_order_dfk.png" alt="">
      </van-col>
      <van-col :span="16">
        <span class="temp-name">{{tempName}}</span>
      </van-col>
    </van-row>

    <div class="round-wrap total-price">
      总计
      <span class="price">￥{{tempPrice}}</span>
    </div>

    <div class="order-info">
      <div class="order-title">订单信息</div>
      <div class="order-item">
        <span class="order-label">订单号</span>
        <span class="order-content">{{6023020190812001}}</span>
        <span class="order-btn">复制</span>
      </div>
      <div class="order-item">
        <span class="order-label">创建时间</span>
        <span class="order-content">2019-10-13  23:30:45</span>
      </div>
    </div>

    <div class="footer">
      <van-button plain type="default">联系客服</van-button>
      <van-button plain type="default">取消订单</van-button>
      <van-button plain type="danger">支付</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderDetail",
    data() {
      return {
        timeLeft: '2小时59分',
        tempName: '模块名称多多',
        tempPrice: '199.00'
      }
    },
    methods: {
    }
  }

</script>

<style scoped lang="less">

  .orderDetail {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #FAFAFA;
    .top {
      border-bottom: 1px solid #E6E6E6;
      /*width: 15rem;*/
      height: 2rem;
      line-height: 2rem;
      position: relative;
      .nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.72rem;
        font-family:PingFang;
        font-weight:bold;
      }
      .fanhui {
        position: absolute;
        left: 0.68rem;
        top: 0.6rem;
        width: 0.4rem;
        height: 0.78rem;
      }
    }
    .round-wrap {
      margin: 0 auto 0.6rem;
      box-shadow:0.06rem 0.08rem 0.86rem 0 rgba(227,227,227,0.65);
      border-radius:0.42rem;
      width: 13.8rem;
      background: #fff;
    }
    .time-left {
      margin-top: 0.8rem;
      height: 2.2rem;
      line-height: 2.2rem;
      .title {
        display: inline-block;
        margin: 0 0.56rem 0 0.36rem;
        padding-left: 1rem;
        color:#333333;
        font-size: 0.64rem;
        font-weight: 500;
        background: url("../../../assets/images/b5_ic_order_dfk.png") left center no-repeat;
        background-size:  0.8rem 0.8rem;
      }
    }
    .temp-info {
      height: 4.4rem;
      .temp-pic {
        margin: 0.6rem 0 0 0.4rem;
        border-radius: 0.2rem;
        width: 3.2rem;
        height: 3.2rem;
      }
      .temp-name {
        display: inline-block;
        margin-top: 0.72rem;
        font-size: 0.6rem;
        color: #333;
        font-weight: bold;
      }
    }
    .total-price {
      box-sizing: border-box;
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.4rem;
      font-size: 0.72rem;
      color: #333;
      .price {
        float: right;
        color: #DD0B14;
        font-size: 0.72rem;
        font-weight: bold;
      }
    }
    .order-info {
      box-sizing:border-box;
      padding: 0.6rem;
      width: 100%;
      background: #fff;
      .order-title {
        font-weight:bold;
        font-size:0.64rem;
        height:2.18rem;
        line-height: 2.18rem;
        border-bottom: 1px solid #E5EBF0;
      }
      .order-item {
        margin-top: 0.6rem;
        font-size:0.56rem;
        font-weight:500;
        color: #333;
        .order-label {
          display: inline-block;
          width: 3.16rem;
        }
        .order-content {
          display: inline-block;
          width: 7.22rem;
        }
        .order-btn {
          font-weight:800;
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 2.2rem;
      line-height: 2.2rem;
      background: #fff;
      text-align: right;
      .van-button {
        width: 3.6rem;
        height: 1.28rem;
        border-radius: 0.2rem;
        &:last-child {
          margin-right: 0.6rem;
        }
      }
    }
  }

</style>
