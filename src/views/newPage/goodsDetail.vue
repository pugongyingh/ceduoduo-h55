<template>
  <div class="goodsDetail">
    <!--    <van-nav-bar-->
    <!--      title="商品详情"-->
    <!--      left-arrow-->
    <!--    />-->
    <van-swipe @change="onChange">
      <img src="../../assets/images/fanhui.png" alt="" class="goBack">
      <van-swipe-item>
        <img src="../../assets/images/ceshi.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/bg.jpg" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/2
        </div>
      </template>
    </van-swipe>
    <div class="shopBox">
      <p class="title">商品标题的文字多多商品标题的文字多多商品标题的文字多多商品标题的文字多多</p>
      <p class="price">
        <span class="nowPrice">￥199.00</span>
        <span class="prevPrice">￥299.00</span>
      </p>
    </div>
    <p class="detail">商品详情</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 0
      }
    },
    methods: {
      onSubmit() {
      },
      onChange(index) {
        this.current = index;
      }
    }
  }
</script>

<style lang="less" scoped>
  .goodsDetail {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    /*.van-nav-bar .van-icon {*/
    /*  color:#666666;*/
    /*}*/

    .van-swipe {
      width: 15rem;
      height: 14rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .goBack {
        width: 1.4rem;
        height: 1.4rem;
        position: absolute;
        left: 0.6rem;
        top: 0.6rem;
        z-index: 999;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }

    .shopBox {
      width: 100%;
      height: 5.2rem;
      background-color: white;
      padding: 0.52rem 0.64rem 1.2rem;
      box-sizing: border-box;
      .title {
        font-size:0.6rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(51,51,51,1);
        line-height:1.04rem;
      }
      .price {
        margin-top: 0.64rem;
        .nowPrice {
          font-size:0.84rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(221,11,20,1);
        }
        .prevPrice {
          font-size:0.56rem;
          font-family:PingFang SC;
          font-weight:500;
          text-decoration:line-through;
          color:rgba(102,102,102,1);
        }
      }
    }

    .detail {
      font-size:0.64rem;
      font-family:PingFang SC;
      /*font-weight:bold;*/
      color:rgba(51,51,51,1);
      line-height:0.72rem;
      margin-top: 1rem;
      margin-left: 0.68rem;
    }
  }
</style>
