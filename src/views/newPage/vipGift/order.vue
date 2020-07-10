<template>
    <div class="order">
      <van-nav-bar
        title="订单结算"
        left-arrow
        @click-left="$router.go(-1)"
      />

      <div class="info shadowBox">
        <div class="left">
          <img src="../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="right">
          <p>会员升级礼包</p>
          <p style="font-size:20px;color:#DD0B14">￥199.00</p>
        </div>
      </div>

<!--      规格-->
      <div class="param">
        <van-cell title="优惠券" is-link value="-30.00" @click="show = true" />
        <van-cell center >
          <template #title>
            <span class="custom-title" >积分</span>
            <span style="color: #999;font-size: 0.52rem;">共200分&nbsp;&nbsp;&nbsp;可用200分，抵扣￥10.00</span>
          </template>
          <template #right-icon>
            <van-switch inactive-color="#999" v-model="checked" size="20" />
          </template>
        </van-cell>
        <van-field
          v-model="message"
          rows="1"
          autosize
          label="订单备注"
          type="textarea"
          placeholder="请输入备注"
        />
        <van-cell>
          <template #default>
            <span>共1件商品 小计</span>
            <span style="color:#DD0B14;margin-left: 0.4rem;">￥199.00</span>
          </template>
        </van-cell>
      </div>

<!--      购买-->
      <div class="bottom-bar shadowBox">
        <div class="left">
          <span style="margin-left: 0.62rem">合计</span>
          <span style="color: #ED001A;margin-left: 0.68rem">￥199.00</span>
        </div>
        <div class="right">
          提交订单
        </div>
      </div>

<!--      优惠券选择-->
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" class="couponschoose">
        <div class="title">
          优惠券
        </div>
        <div class="container">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell title="￥10.00" clickable  v-for="(item,index) in 10" @click="radio = index+1" :key="item">
                <template #right-icon>
                  <van-radio :name="index + 1" />
                </template>
                <template #label>
                  <p style="color: #333333">订单满￥199.00使用 </p>
                  <p style="color: #333333">使用期限 2016.05.21-2016.05.22</p>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="cancelbutton" @click="show = false">
          取消
        </div>
      </van-popup>
    </div>
</template>

<script>
    export default {
        name: "order",
      data() {
          return {
            checked:false,
            message:'',
            show:false,
            radio:0
          }
      }
    }
</script>

<style scoped lang="less">
  .info {
    width: 13.8rem;
    height: 4.4rem;
    border-radius: 0.42rem;
    display: flex;
    background-color: #fff;
    margin:0.78rem auto ;
    .left {
      height: 100%;
      width: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 5px;
      }
    }
    .right {
      width: calc(100% - 4rem);
      height: 100%;
      padding-top: 0.6rem;
      box-sizing: border-box;
      p {
        font-size: 15px;
        color: #333;
        margin-bottom: 0.6rem;
      }
    }
  }

  .bottom-bar {
    width: 100%;
    height: 1.8rem;
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    .left {
      line-height: 1.8rem;
      width: 9rem;
      font-size:0.64rem ;
    }
    .right {
      height: 100%;
      width: calc(100% - 9rem);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: white;
      background-color: #ED001A;
    }
  }

  .couponschoose {
    .title {
      width: 100%;
      height: 2.2rem;
      text-align: center;
      line-height: 2.2rem;
      font-size: 14px;
      border-bottom: 1px solid #F2F2F2;
    }
    .cancelbutton {
      width: 100%;
      height: 1.8rem;
      background-color: #ED001A;
      text-align: center;
      line-height: 1.8rem;
      color: white;
      font-size: 14px;
    }
    .container {
      height: calc(100% - 1.8rem - 2.2rem);
      background-color: blue;
      overflow: scroll;
    }
  }
</style>
