<template>
  <div class="order">
    <div class="childBox" v-show="childShow"><router-view @back="childShow=false" @choseAddress="chooseAddress" :good="good"></router-view></div>
    <van-nav-bar
      title="订单结算"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="address-box" @click="toAddress">
        <div class="address">
          <div class="top">
            <div class="item">{{address.realName||''}}</div>
            <div class="item">{{address.phone||''}}</div>
          </div>
          <div class="bottom">{{address.province+address.city+address.district+address.detail||''}}</div>
        </div>
        <img src="../../../assets/images/shop-more.png" alt="">
    </div>

    <div class="goods">
      <div class="goodImg">
        <img :src="good.logo||good.thumbnail" alt="" style="">
      </div>
      <div class="goodInfo">
        <p class="name">{{good.name}}</p>
        <p class="specification">{{chosenSpec.reduce(function (total, currentValue, currentIndex, arr) {
          if(total!='') return total + '+' +currentValue;
          return total + currentValue;
          },'')}}</p>
        <p class="price">￥{{good.price||good.salePrice}}</p>
      </div>
    </div>
    <van-cell-group>
      <div class="stepper-box"><p>选择份数</p><van-stepper v-model="quantity" button-size="1rem" /></div>
    </van-cell-group>
    <van-cell-group>
      <div class="point-box">
        <p>积分</p>
        <div class="content">不可用</div>
        <van-switch v-model="checked" active-color="#07c160" inactive-color="rgb(206, 206, 206)" disabled  size="24px" />
      </div>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="value" label="订单备注" placeholder="请输入备注" style="padding: 13px 16px;"/>
    </van-cell-group>
    <div class="total">
      <span class="sp2">￥{{good.price||good.salePrice}}</span>
      <span class="sp1">共{{good.length}}件商品 小计</span>
    </div>


    <div class="footer">
      <div class="info">
        <span class="sp1">合计</span>
        <span class="sp2">￥{{good.price||good.salePrice}}</span>
      </div>
      <div class="submit" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
  import { findAddressById } from '@/services/address';
  export default {
    name: "videoOrder",
    data() {
      return {
        show:false,
        checked:false,
        sms:'',
        value:'',
        quantity:1,
        good:{},
        totalPrice:0,
        address:{},
        chosenSpec:[],
        childShow:false
      }
    },
    methods:{
      submitOrder(){
        this.childShow = true
        this.$router.push("chooseTemplate")
      },
      toAddress(){
        this.childShow = true
        this.$router.push("videoAddress")
      },
      chooseAddress(childValue) {
        this.address = childValue
      }
    },
    created() {
      let that = this
      this.good = this.$route.params.good
      this.chosenSpec = this.$route.params.chosenSpec
      findAddressById({id:JSON.parse(localStorage.getItem("userMsg")).id},res=>{
        that.address = res[0]
      })
    },
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

    .childBox{
      width: 100vw;
      min-height: 100vh;
      position: absolute;
      z-index: 1000;
      background: rgb(255, 255, 255);
      overflow: auto;
    }

    .address-box{
      width: 13.8rem;
      height: 3rem;
      background: white url('../../../assets/newImages/b4_address_bg@2x.png') no-repeat 50% 43%;
      background-size: 120%;
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
        .specification{
          font-size:0.56rem;
          font-family:PingFang SC;
          font-weight:500;
          color:#b3b3b3;
          line-height:0.68rem;
          margin-top: 0.24rem;
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
      p{
        font-size:0.6rem;
      }
    }

    .point-box{
      position: relative;
      padding: 13px 16px;
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
      p{
        margin-right: 0.8rem;
        font-size:0.6rem;
        float: left;
      }
      .content{
        float: left;
        max-width: 9rem;
        font-size:0.52rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(153,153,153,1);
        overflow: hidden;
      }
      .van-switch{
        float: right;
      }
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
