<template>
    <div class="payment">
      <div class="navbar">
        <van-nav-bar
          title="支付"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>


      <div class="pay-control" v-if="type === 'pay'">
          <div class="label">
            需支付
          </div>
          <div class="price-panel">
            <div class="left">
              <p>
                ￥999
              </p>
            </div>
            <div class="right">
              <p style="font-size:16px;color: #F8B23A ">
                全部提现
              </p>
            </div>
          </div>
        </div>

<!--        付款方式-->
        <van-radio-group class="paymethod" v-model="radio" v-if="type === 'pay'">
          <van-cell-group>
            <van-cell title="单选框 1" clickable @click="radio = '1'">
              <template #title>
                <img src="../../../../assets/newImages/g3_pay_ic_wechat.png" alt="">
                <span class="custom-title">微信</span>
              </template>
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="单选框 2" clickable @click="radio = '2'">
              <template #title>
                <img src="../../../../assets/newImages/g3_pay_ic_airpay.png" alt="">
                <span class="custom-title">支付宝</span>
              </template>
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

<!--          支付成功-->
        <div class="pay-success" v-if="type === 'success'">
            <div style="margin-top: 2.78rem">
              <img src="../../../../assets/newImages/dfe_img_success.png" alt="">
              <p>订单付款成功</p>
            </div>
            <div class="button-list" style="margin-top: 2.6rem">
                  <div class="check shadowBox">查看订单</div>
                  <div class="shopping shadowBox">继续逛逛</div>
            </div>
        </div>

      <!--          支付失败-->
      <div class="pay-success" v-if="type === 'fail'">
        <div style="margin-top: 2.78rem">
          <img src="../../../../assets/newImages/pay-fail.png" alt="">
          <p>订单付款失败</p>
        </div>
        <div class="button-list" style="margin-top: 2.6rem">
          <div class="check shadowBox">查看订单</div>
          <div class="shopping shadowBox">重新支付</div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "payment",
      data() {
          return {
            radio:'1',
            type:this.$route.query.type
          }
      },
      created() {

      }
    }
</script>

<style scoped lang="less">
  .pay-control {
    width: 100%;
    height: 5.56rem;
    background-color: #fff;
    .label {
      width: 100%;
      height: 1.4rem;
      font-size: 15px;
      line-height: 1.4rem;
      padding-left: 0.54rem;
    }
    .price-panel {
      width: 100%;
      height: 4.16rem;
      line-height: 4.16rem;
      font-size: 40px;
      display: flex;
      justify-content: space-between;
      .right {
        padding-right: 0.54rem;
      }
    }
  }

  .paymethod {
    margin-top: 0.4rem;
  }

  .van-cell__title img {
    vertical-align: text-top;
    margin-right: 0.24rem;
  }

  .pay-success {
    img {
      width: 5rem;
      height: 5rem;
    }
    p {
      font-size: 14px;
      text-align: center;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .button-list {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-evenly;
    div {
      width: 6rem;
      height: 1.8rem;
      text-align: center;
      line-height: 1.8rem;
      border-radius:4px ;
      font-size: 16px;
    }
    .shopping {
      background-color: #ED001A;
      color: white;
    }
  }
</style>
