<template>
  <div class="order">
    <van-nav-bar
      title="订单结算"
      left-arrow
      @click-left="$router.push('/cart')"
    />
    <div class="address-box">
        <div class="address">
          <div class="top">
            <div class="item">{{address.realName}}</div>
            <div class="item">{{address.phone}}</div>
          </div>
          <div class="bottom">{{address.province+address.city+address.district+address.detail}}</div>
        </div>
        <img src="../../assets/images/shop-more.png" alt="">
    </div>
    <div class="goods" v-for="(item,index) in goodlist">
      <div class="goodImg">
        <img :src="item.thumbnail" alt="" style="">
      </div>
      <div class="goodInfo">
        <p class="name">{{item.productName}}</p>
        <p class="price">￥{{item.price}}</p>
      </div>
    </div>
<!--    <van-cell-group>-->
<!--      <div class="stepper-box"><p>选择份数</p><van-stepper v-model="quantity" /></div>-->
<!--    </van-cell-group>-->
    <van-cell-group>
      <van-field v-model="value" label="订单备注" placeholder="请输入备注" style="padding: 13px 16px;"/>
    </van-cell-group>
    <div class="total">
      <span class="sp2">￥{{totalPrice}}</span>
      <span class="sp1">共{{goodlist.length}}件商品 小计</span>
    </div>


    <div class="footer">
      <div class="info">
        <span class="sp1">合计</span>
        <span class="sp2">￥{{totalPrice}}</span>
      </div>
      <div class="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
  import { findAddressById } from '@/services/address';
  export default {
    data() {
      return {
        show:false,
        checked:false,
        sms:'',
        value:'',
        quantity:1,
        goodlist:[],
        totalPrice:0
      }
    },
    methods:{
      onSubmit(){}
    },
    mounted() {
      let that = this
      this.totalPrice = this.$route.params.totalPrice
      this.$route.params.car.forEach(function(item) {
        item.productList.forEach(function(good) {
          if(good.checked){
            that.goodlist.push(good)
          }
        })
      })
      findAddressById({id:JSON.parse(localStorage.getItem("userMsg")).id},res=>{
        this.address = res[0]
      })
    }
  }
</script>

<style lang="less" scoped>
  .order {
    width: 100%;
    margin-bottom: 3rem;
    background-color: #FAFAFA;
    .van-nav-bar .van-icon {
      color:#666666;
    }

    .address-box{
      width: 13.8rem;
      height: 3rem;
      background-color: white;
      margin: 0.8rem auto 1rem;
      display: flex;
      justify-content: space-between;
      box-shadow:1px 2px 22px 0px rgba(227,227,227,0.65);
      border-radius:0.44rem;
      padding: 0.5rem 0.4rem;
      box-sizing: border-box;
      .address{
        width: 12rem;
        height: 2rem;
        .top{
          display: flex;
          justify-content: left;
          .item{
            height:1rem;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:1rem;
            margin-right: 0.46rem;
          }
        }
        .bottom{
          height:1rem;
          font-size:0.56rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:1rem;
        }
      }
      img{
        height: 0.6rem;
        margin: auto 0;
      }
    }

    .goods {
      width: 13.8rem;
      height: 4.4rem;
      background-color: white;
      margin: 0.8rem auto 1rem;
      box-shadow:1px 2px 22px 0px rgba(227,227,227,0.65);
      border-radius:0.44rem;
      padding: 0.6rem 0.4rem;
      box-sizing: border-box;
      .goodImg {
        float: left;
        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius:0.2rem;
        }
      }
      .goodInfo {
        float: left;
        margin-left: 0.6rem;
        .name {
          font-size:0.6rem;
          font-family:PingFang SC;
          /*font-weight:bold;*/
          color:rgba(51,51,51,1);
          line-height:1.04rem;
        }
        .price {
          font-size:0.56rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(221,11,20,1);
          line-height:0.68rem;
          margin-top: 0.56rem;
        }
      }
    }
    .van-cell  /deep/ .van-field__label {
      width: 65px;
    }
    .total {
      width: 100%;
      height: 2.2rem;
      background-color: white;
      span {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      .sp1 {
        font-size:0.64rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:0.68rem;
        float: right;
      }
      .sp2 {
        font-size:0.64rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(221,11,20,1);
        line-height:0.68rem;
        float: right;
        margin-left: 0.64rem;
        margin-right: 0.64rem;
      }
    }

    .stepper-box{
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      width: 100%;
      padding: 13px 16px;
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
    }

    .footer {
      width: 100%;
      height: 1.8rem;
      background-color: white;
      position: fixed;
      bottom: 0;
      .info {
        height: 100%;
        width: 65%;
        float: left;
        .sp1 {
          font-size:0.64rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          margin-left: 0.64rem;
        }
        .sp2 {
          font-size:0.64rem;
          font-family:PingFang SC;
          /*font-weight:bold;*/
          color: #DD0B14;
        }
      }
      .submit {
        float: left;
        height: 100%;
        width: 35%;
        font-size:0.64rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(255,255,255,1);
        line-height: 1.8rem;
        background-color: #DD0B14;
        text-align: center;
      }
    }

    .discount {
      .title {
        width: 100%;
        height: 2.2rem;
        border-bottom: 1px solid rgba(242,242,242,1);
        font-size:0.6rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(35,35,35,1);
        line-height: 2.2rem;
        text-align: center;
      }
      .discountList {
        .item {
          padding: 0.64rem;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(242,242,242,1);
          position: relative;
          .price {
            font-size:0.56rem;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(221,11,20,1);
            line-height:0.72rem;
            margin-bottom: 0.36rem;
          }
          .intro{
            font-size:0.56rem;
            font-family:PingFang SC;
            font-weight:400;
            line-height:0.72rem;
            color: #333333;
          }
          .van-radio {
            position: absolute;
            right: 0.64rem;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .close {
        height: 1.8rem;
        width: 100%;
        background-color: #DD0B14;
        font-size:0.64rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 1.8rem;
      }
    }
  }
</style>
