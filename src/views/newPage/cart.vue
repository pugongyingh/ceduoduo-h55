<template>
  <div class="cart">
    <div class="title">
      购物车
      <span class="manage" @click="btnType = !btnType">{{btnType?'管理':'完成'}}</span>
    </div>
    <div class="list">
      <div class="card" v-for="(store,index) in goodlist">
        <div class="card-top">
          <div class="shop">
            <van-checkbox @click="storeCheckAll(index)" :value="store.checked"  checked-color="rgba(237,0,26,1)">{{store.storeName}}</van-checkbox>
          </div>
          <img src="../../assets/images/shop-more.png" alt="">
        </div>
        <div class="card-bottom"  v-for="(good,gIndex) in store.productList">
          <div style="display: inline-block;position: relative;top: -50%;transform: translateY(50%)">
            <van-checkbox @click="checkGood(index,gIndex)" :value="good.checked"  checked-color="rgba(237,0,26,1)"></van-checkbox>
          </div>
          <img :src="good.thumbnail" alt="">
          <div class="intro">
            <p>{{good.productName}}</p>
            <span class="money">￥{{good.price}}</span>
            <van-stepper v-model="good.quantity" @change="updateQuantity(good.quantity,good.storeItemId)" class="stepper"/>
          </div>
        </div>
      </div>
      <van-empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车空空如也~"
        v-if="goodlist.length == 0"
        style="margin: 4rem 0;"
      />
    </div>
    <div class="settle">
      <div class="settle-right">
        <van-checkbox @click="checkAll" :value="allChecked" style="margin: auto 1.2rem"  checked-color="rgba(237,0,26,1)">全选</van-checkbox>
      </div>
      <div class="settle-left">
        <div class="settle-total" v-if="btnType">合计：<span style="font-size:13px;font-family:PingFang;font-weight:400;color:rgba(220,25,35,1);">￥{{totalPrice}}</span></div>
        <div class="settle-btn" v-if="btnType" @click="toOrderPage">结算</div>
        <div class="delete-btn" v-if="!btnType" @click="deleteGood">删除</div>
      </div>
    </div>
    <div class="fillBox" style="height: 100px "></div>
  </div>
</template>

<script>
  import { post } from '@/utils/request/index';

  export default {
    data() {
      return {
        goodlist:[],
        btnType:true,
        allChecked:false,
        checkGoodsList:[],
        totalPrice:0,
        value:'',
      }
    },
    methods:{
      sumPrice(goodlist){
        let that = this
        let totalPrice = 0
        goodlist.forEach(function(item) {
            item.productList.forEach(function(good) {
              if(good.checked){
                totalPrice += good.price*good.quantity
              }
            })
        })
        that.totalPrice = totalPrice
      },
      updateQuantity(quantity,storeItemId,good){
        post('api/shopCart/updateQuantity',{
            quantity:quantity,
            storeItemId:storeItemId
          },res => {
        })
        this.sumPrice(this.goodlist)
      },
      deleteGood(){
        let storeItemIdList = []
        let that = this
        that.goodlist.forEach(function(item) {
          item.productList.forEach(function(good) {
            if(good.checked){
              storeItemIdList.push(good.storeItemId)
            }
          })
        })
        post('api/shopCart/deleteByStoreItemId',{
          storeItemIdList
        },res => {
          this.updataGoodList();
          this.sumPrice(that.goodlist)
        })
      },
      checkAll(){
        if(!this.allChecked){
          this.allChecked = true;
          this.goodlist.forEach(function(item) {
            item.checked = true
            item.productList.forEach(function(item) {
              item.checked = true
            })
          })
        }else{
          this.allChecked = false;
          this.goodlist.forEach(function(item) {
            item.checked = false
            item.productList.forEach(function(item) {
              item.checked = false
            })
          })
        }
        this.sumPrice(this.goodlist)
      },
      storeCheckAll(index){
        if(!this.goodlist[index].checked){
          this.goodlist[index].checked = true;
          this.goodlist[index].productList.forEach(function(item) {
            item.checked = true
          })
        }else{
          this.goodlist[index].checked = false;
          this.goodlist[index].productList.forEach(function(item) {
            item.checked = false
          })
        }
        this.sumPrice(this.goodlist)
      },
      checkGood(index,gIndex){
        let that = this
        this.goodlist[index].productList[gIndex].checked = !this.goodlist[index].productList[gIndex].checked
        if(this.goodlist[index].productList.every(function (value, index, array) {
          if (value.checked) {
            return true;
          }else {
            return false;
          }
        })){
          that.goodlist[index].checked = true
        }else{
          that.goodlist[index].checked = false
        }
        this.sumPrice(this.goodlist)
      },
      updataGoodList(){
        let that = this
        let user = JSON.parse(localStorage.getItem('userMsg'))
        post('api/shopCart/findByUserId',{
          token:user.token,
          pageable:{
            page:1,
            size:10
          }
        },res => {
          res.forEach(function(item) {
            that.$set(item, "checked", false)
            item.productList.forEach(function(item) {
              that.$set(item, "checked", false)
            })
          })
          that.goodlist = res
        })
      },
      toOrderPage(){
        this.goodlist.forEach(function(item) {
          item.productList.forEach(function(item) {
            if(item.checked == true){
              this.checkGoodsList.push(item)
            }
          })
        })
        this.$router.push({
          name: 'orderPage',
          params: {
            car: this.goodlist,
            totalPrice:this.totalPrice
          }
        })
      }
    },
    mounted() {
      this.updataGoodList();
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;

    .title {
      width: 100%;
      height: 1.6rem;
      /*background-color: #5ac55a;*/
      font-size: 0.72rem;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 1.6rem;
      text-align: center;
      color: rgba(51, 51, 51, 1);
      position: relative;
      background-color: white;

      .manage {
        position: absolute;
        right: 0.72rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.52rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        /*line-height:21px;*/
      }
    }

    .list {
      .card {
        position: relative;
        width: 13.8rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        margin: 0.4rem auto 0;
        padding: 0.48rem 0.6rem;
        box-sizing: border-box;

        .card-top {
          position: relative;

          .shop {
            font-size: 0.52rem;
            font-family: PingFang SC;
            /*font-weight:bold;*/
            color: rgba(51, 51, 51, 1);
            /*line-height:21px;*/
            display: inline-block;
          }

          img {
            width: 0.36rem;
            height: 0.52rem;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .delete-button {
          height: 100%;
        }
        .card-bottom {
          position: relative;
          height: 2.68rem;
          margin: 0.8rem 0 0.2rem;

          img {
            width: 2.68rem;
            height: 2.68rem;
          }

          .intro {
            height: 2.68rem;
            width: 7.64rem;
            position: relative;
            display: inline-block;
            margin-left: 0.4rem;
            p {
              position: absolute;
              top: -0.24rem;
              font-size:0.44rem;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
              width:7.64rem;
              height:1.28rem;
            }
            .money {
              position: absolute;
              bottom: 0;
              left: 0;
              font-size:0.48rem;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(237,0,26,1);
              line-height:0.84rem;
            }
            .stepper {
              position: absolute;
              bottom: 0;
              right: 0;
            }
          }
        }
      }
      .custom-image .van-empty__image {
        width: 90px;
        height: 90px;
      }
    }

    .settle{
      width: 15rem;
      height: 1.6rem;
      background: rgba(255,255,255,1);
      position: fixed;
      bottom: 50px;
      border-bottom: 1px solid rgba(230,230,230,1);
      border-top: 1px solid rgba(230,230,230,1);
      .settle-right{
        width:5.2rem;
        font-size:12px;
        font-family:PingFang;
        color:rgba(119,119,119,1);
        transform: translateY(50%);
      }
      .settle-left{
        width: 9.8rem;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content:flex-end;
        align-items:center;
        .settle-btn{
          width: 3.6rem;
          height: 1.02rem;
          line-height: 1.02rem;
          text-align: center;
          font-size:15px;
          font-family:PingFang;
          background-image: linear-gradient(rgba(234,93,76,1), rgba(233,68,60,1));
          color:rgba(255,255,255,1);
          border-radius: 50px;
          margin: 0 0.6rem;
        }
        .delete-btn{
          width: 3.6rem;
          height: 1.02rem;
          line-height: 1.02rem;
          text-align: center;
          font-size:15px;
          font-family:PingFang;
          color:rgba(233,68,60,1);
          border: 1px solid rgba(233,68,60,1);
          border-radius: 50px;
          margin: 0 0.6rem;
        }
        .settle-total{
          height:23px;
          font-size:15px;
          font-family:PingFang;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:23px;
        }
      }
    }

    .van-checkbox /deep/ .van-checkbox__icon--checked /deep/ .van-icon {
      background-color: #9D3024;
      border-color: #9D3024;
    }
  }
</style>
