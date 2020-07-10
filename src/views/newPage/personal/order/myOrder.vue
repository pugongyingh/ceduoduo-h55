<template>
  <div class="myorder">
    <van-nav-bar
      class="fixTop"
      title="我的订单"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="fake"></div>

<!--    tabcontrol-->
    <div class="tab">
      <div v-for="(item,index) in tabText" :key="index" @click="changeTab(index)">
        <span :class="{'active':index === activeIndex}">{{item}}</span>
      </div>
    </div>
    <div class="fake"></div>


    <!--    商品详情-->
    <div class="orderCard shadowBox" v-for="item in orderList">
        <div class="orderStatus">
          <span>订单号: {{item.orderNumber}}</span>
          <span>{{item.orderStatus}}</span>
        </div>
        <div class="orderContent">
          <div class="item" v-for="good in item.itemSpecsDTOList" >
             <div class="item-left">
               <img :src="good.platformProductCovers" alt="">
             </div>
             <div class="item-right">
               <p class="name">{{good.platformProductName}}</p>
               <p class="param">{{good.optionName}}</p>
               <p class="price">
                 <span>{{'￥' + good.price}}</span>
                 <span>{{'×' + good.number}}</span>
               </p>
             </div>
          </div>
        </div>
        <div class="orderControl">
            <p class="total">共{{item.orderSum}}件商品,小计<span>{{'￥' + item.orderPrice}}</span></p>
            <div class="button-container">
              <div class="button" v-if="item.orderStatus === '待上传' || item.orderStatus === '待付款' || item.orderStatus === '待发货' || item.orderStatus === '待收货' || item.orderStatus === '待评价'">联系客服</div>
              <div class="button" @click="cancelOrder(item.orderNumber)" v-if="item.orderStatus === '待上传' || item.orderStatus === '待付款'" >取消订单</div>
              <div class="button" v-if="item.orderStatus === '待上传'">待上传</div>
              <div class="button" v-if="item.orderStatus === '待付款'" @click="to('payment?type=pay')">支付</div>
              <div class="button" v-if="item.orderStatus === '待发货'">提醒发货</div>
              <div class="button" v-if="item.orderStatus === '待收货'">确认收货</div>
              <div class="button" @click="to('orderStatusrDetailZero?type=sending')" v-if="item.orderStatus === '交易完成' || item.orderStatus === '待评价' || item.orderStatus === '待收货'">查看物流</div>
              <div class="button" v-if="item.orderStatus === '待评价'" @click="to('/comment')">评价</div>
              <div class="button" @click="toDel(item.orderNumber)" v-if="item.orderStatus === '交易关闭'">删除订单</div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
  import mixin from '@/utils/mixins/mixin'
  import {findByUserAndStatus,updateStatusById,deleteOrder} from "../../../../services/order";
  import {Dialog,Toast} from 'vant'

  export default {
        name: "myOrder",
      mixins:[mixin],
      props:{
        activeted:{
          type:Number,
          default:0
        }
      },
      watch:{
        "$route":"changeIndex",
        activeIndex(val) {
          this.changeTab(this.activeIndex)
        }
      },
      data() {
        return {
          tabText:['全部','待付款','待发货','待收货','待评价'],
          activeIndex:0,
          size:10,
          sort:{desc:['id']},
          page:1,
          orderList:[]
        }
        },
        methods:{
          cancelOrder(id) {
              Dialog.confirm({
                title:'确定取消订单？'
              }).then(() => {
                updateStatusById({
                  id,
                  status:'交易关闭'
                },res => {
                  Toast('取消成功')
                  this.changeTab(this.activeIndex)
                })
              })
          },
          toDel(id) {
            Dialog.confirm({
              title:'确定删除订单？'
            }).then(() => {
              deleteOrder({
                id
              },res => {
                Toast('删除成功')
                this.changeTab(this.activeIndex)
              })
            })
          },
          changeTab(index) {
            this.activeIndex = index
            let order = index === 0? {}:{
              status:this.tabText[index]
            }
            findByUserAndStatus({
              order,
              pageable:{
                size:this.size,
                page:this.page,
                sort:this.sort
              }
            },res => {
              this.orderList = res
            })
          }
        },
      mounted() {
        let index = this.$route.query.index
        if(index) {
          this.activeIndex = Number.parseInt(index)
        }
        let order = index !== 0? {
          status:this.tabText[index]
        }:{}
        findByUserAndStatus({
          order,
          pageable:{
            size:this.size,
            page:this.page,
            sort:this.sort
          }
        },res => {
          this.orderList = res
        })
      }
    }
</script>

<style scoped lang="less">
  .tab {
    height: 1.84rem;
    display: flex;
    background-color: #fff;
    border-top: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 0.6rem;
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 99;
    div {
      flex: 20%;
      height: 100%;
      text-align: center;
      line-height: 1.6rem;
      span {
        font-size: 14px;
        padding:6px 0 ;
      }
      .active {
        border-bottom: 1px solid #DD0B14;
      }
    }
  }

  .orderCard {
    width: 13.8rem;
    /*height: 13.48rem;*/
    margin:0 auto;
    margin-top: 0.6rem;
    border-radius: 0.5rem;
    background-color: #fff;
    .orderStatus {
      height: 1.8rem;
      border-bottom: 1px solid #E6E6E6 ;
      box-sizing: border-box;
      position: relative;
      span {
        position: absolute;
        font-size: 14px;
        top: 0.48rem;
      }
      span:first-child {
        left: 0.48rem;
      }
      span:last-child {
        right: 0.48rem;
      }
    }
    .orderContent {
      border-bottom: 1px solid #E6E6E6;
      .item {
        height: 4.08rem;
        width: 100%;
        .item-left {
          float: left;
          height: 100%;
          width: 3.6rem;
          text-align: center;
          img {
            margin-top: 0.4rem ;
            width: 3.2rem;
            height: 3.2rem;
            border-radius:0.2rem ;
          }
        }
        .item-right {
          float: right;
          height: 100%;
          width: calc(100% - 3.6rem);
          padding: 10px 10px;
          box-sizing: border-box;
          p {
            font-size: 0.56rem;
          }
          .name {
            margin-bottom:0.3rem ;
          }
          .param {
            margin-bottom: 0.6rem;
          }
          .price {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
    .orderControl {
      padding-bottom: 0.4rem;
      /*margin-left: 6.24rem;*/
      font-size: 14px;
      .total {
        margin-top: 0.48rem;
        margin-bottom: 0.48rem;
        margin-left: 6.24rem;
      }
      span {
        font-size: 16px;
        color: #FFB400;
      }
      .button-container {
        display: flex;
        justify-content: flex-end;
        .button {
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
    }
  }

  .button-container div:last-child {
    border:1px solid #DD0B14!important;
    color: #DD0B14;
  }

  .orderCard:last-child {
    margin-bottom: 1.44rem;
  }
</style>
