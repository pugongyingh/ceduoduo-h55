<template>
    <div class="vipOrder">
      <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="$router.go(-1)"
      />
<!--      商品状态-->
      <div class="status shadowBox">
          <div class="wallet-icon">
            <img src="../../../../assets/newImages/wallet-icon.png" alt="">
          </div>
          <span style="font-size: 0.6rem;">{{status}}</span>
          <span v-if="status === '待付款'" style="font-size: 0.52rem;color: #999999;">剩2小时59分自动关闭</span>
      </div>

<!--      商品-->
      <div class="goods shadowBox">
          <div class="left">
            <img src="../../../../assets/images/ceshi.jpg" alt="">
          </div>
        <div class="right">
          <p>会员礼包222222222222222222222222222222</p>
        </div>
      </div>

<!--      商品价格-->
      <div class="price" style="font-size: 0.56rem">
          <p>
            <span>商品总价</span>
            <span>￥ 699.00</span>
          </p>
          <p>
            <span>总计</span>
            <span class="totalprice">￥ 710.00</span>
          </p>
      </div>

<!--      订单信息-->
      <div class="orderInfo">
          <div class="title">
            <p>
              订单信息
            </p>
          </div>
          <div class="infoDetail">
            <div class="left">
              <p>订单号</p>
              <p>创建时间</p>
            </div>
            <div class="middle">
              <p>131412312312</p>
              <p>2019-10-13  23:30:45</p>
            </div>
            <div class="right">
              <p>复制</p>
            </div>
          </div>
      </div>

      <div class="control shadowBox button-container">
        <div class="button" v-if="status === '待付款' || status === '待提交资料' || status === '审核失败，需重新提交' || status === '待审核'">联系客服</div>
        <div class="button" v-if="status === '待付款'" >取消订单</div>
        <div class="button" v-if="status === '待付款'">支付</div>
        <div class="button" v-if="status === '待提交资料'">提交审核资料</div>
        <div class="button" v-if="status === '审核失败，需重新提交'">提交审核资料</div>
        <div class="button" v-if="status === '交易完成'">切换角色权限</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "vipOrder",
      data() {
          return {
            status:'交易完成'
          }
      }
    }
</script>

<style scoped lang="less">

  .vipOrder {
    position: relative;
  }
  .status {
    width: 13.8rem;
    height: 2.2rem;
    border-radius: 0.42rem;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 0.68rem;
    margin-bottom: 0.68rem;
    line-height: 2.2rem;
    display: flex;
    justify-content: flex-start;
    .wallet-icon {
      width: 0.8rem;
      height: 0.8rem;
      margin-left: 0.62rem;
    }
    span {
      margin-left: 0.56rem;
    }

  }

  .goods {
    width: 13.8rem;
    height: 4.4rem;
    border-radius: 0.42rem;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 0.6rem;
    .left {
      height: 100%;
      width: 4rem;
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius:0.2rem ;
      }
    }
    .right {
      float: right;
      width: calc(100% - 4rem);
      height: 100%;
      box-sizing: border-box;
      p {
        font-size: 0.6rem;
        padding:0.54rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .totalprice {
    margin-left: 1.12rem;
  }

  .price {
    width: 100%;
    background-color: #fff;
    height: 2.8rem;
    margin-bottom: 0.6rem;
    padding: 0.6rem;
    box-sizing: border-box;
  }

  .price p:first-child {
    margin-bottom:0.08rem ;
  }

  .price p span:first-child {
    margin-right: 1rem;
  }

  .orderInfo {
    width: 100%;
    background-color: #fff;
    height: 5.04rem;
    margin-bottom: 5.06rem;
    .title {
      height: 2.18rem;
      padding: 0 0.6rem;
      line-height: 2.18rem;
      p {
        font-size:16px;
        border-bottom: 1px solid #E5EBF0;
      }
    }
    .infoDetail {
      height: calc(100% - 2.18rem);
      display: flex;
      font-size: 14px;
      .left {
        width: 3.76rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        padding-left: 0.6rem ;
        box-sizing: border-box;
      }
      .middle {
        width: 6.9rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
      }
      .right {
        width: calc(100% - 3.76rem - 6.9rem);
        padding-top: 11px;
        box-sizing: border-box;
      }
    }
  }

  .control {
    width: 100%;
    background-color: #fff;
    height: 2.2rem;
    position: fixed;
    bottom: 0;
  }
  .button-container div:last-child {
    border:1px solid #DD0B14!important;
    color: #DD0B14;
  }
  .button-container {
    line-height: 2.2rem;
    display: flex;
    justify-content: flex-end;
    .button {
      margin-top: 0.4rem;
      width: 3.6rem;
      height: 1.28rem;
      border-radius: 0.2rem;
      border: 1px solid #999;
      font-size: 0.56rem;
      text-align: center;
      line-height: 1.28rem;
      margin-right: 0.4rem;
    }
  }
</style>
