<template>
  <div class="mine">
<!--    顶部信息-->
    <div class="userInfo">
      <div class="userInfo-top">
        <div class="setting" @click="$router.push('/setting')">
          <img src="../../../../assets/newImages/setting-icon.png" alt="">
        </div>
        <div class="changeRole">
          <img src="../../../../assets/newImages/change-role.png" alt="" @click="changeRole">
        </div>
        <div class="avatar">
          <img v-if="user.avatar !== ''" :src="user.avatar" alt="">
          <img v-else src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="other">
          <p class="p1">
            <span>{{user.nickname}}</span>
            <span class="vip" v-if>{{Array.isArray(user.grade)? user.grade[0] + user.grade[1]:user.grade}}</span>
          </p>
          <p class="p2">
            <span>靓仔</span>
          </p>
        </div>
      </div>
<!--      保护不用定位   金额与积分-->
      <div class="protect">
        <div class="userInfo-bottom">
          <div class="first">
            <span class="money">金额</span>
            <span class="money-son" v-show="show">{{user.hasOwnProperty('balance')? user.balance:0}}</span>
            <span class="money-son" v-show="!show">***</span>
            <img v-show="show" src="../../../../assets/newImages/yanjing.png" alt="" @click="eye">
            <img v-show="!show" src="../../../../assets/newImages/biyan.png" alt="" @click="eye">
          </div>
          <div class="first">
            <span class="money">积分</span>
            <span class="money-son" v-show="show2">{{user.hasOwnProperty('totalPoint')? user.totalPoint:0}}</span>
            <span class="money-son" v-show="!show2">***</span>
            <img v-show="show2" src="../../../../assets/newImages/yanjing.png" alt="" @click="eye2">
            <img v-show="!show2" src="../../../../assets/newImages/biyan.png" alt="" @click="eye2">
          </div>
          <div class="first" @click="$router.push('/wallet/' + user.id)">
            <img class="jumbTo" src="../../../../assets/images/goBack.png" alt="">
          </div>
        </div>
      </div>
    </div>
<!--订单-->
    <div class="order">
      <div class="top" >
        <span class="myOrder">我的订单</span>
        <span class="allOrder" @click="$router.push('/myOrder')">查看全部订单</span>
        <img src="../../../../assets/images/more.png" alt="">
      </div>
      <div class="bottom">
        <div class="item">
          <img src="../../../../assets/images/order-1.png" @click="$router.push('/myOrder?index=1')" alt="">
          <p>待付款</p>
        </div>
        <div class="item">
          <img src="../../../../assets/images/order-2.png" @click="$router.push('/myOrder?index=2')" alt="">
          <p>待发货</p>
        </div>
        <div class="item">
          <img src="../../../../assets/images/order-3.png" @click="$router.push('/myOrder?index=3')" alt="">
          <p>待收货</p>
        </div>
        <div class="item">
          <img src="../../../../assets/images/order-4.png" @click="$router.push('/myOrder?index=4')" alt="">
          <p>待评价</p>
        </div>
      </div>
    </div>
<!--服务-->
    <div class="service">
      <div class="top">我的服务</div>
      <div class="bottom">
        <div class="item" @click="$router.push('/myWork?tab=0')">
          <img src="../../../../assets/images/service-1.png" alt="">
          <p>我的作品</p>
        </div>
        <div class="item" @click="toProfile">
          <img src="../../../../assets/images/service-2.png" alt="">
          <p>个人资料</p>
        </div>
        <div class="item" @click="$router.push('/myWork?tab=1')">
          <img src="../../../../assets/images/service-3.png" alt="">
          <p>我的收藏</p>
        </div>
        <div class="item">
          <img src="../../../../assets/images/service-4.png" alt="">
          <p>大赛评选</p>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <img src="../../../../assets/images/service-5.png" alt="">
          <p>直播专区</p>
        </div>
        <div class="item" @click="$router.push('/game')">
          <img src="../../../../assets/images/service-6.png" alt="">
          <p>我的赛事</p>
        </div>
        <div class="item" @click="$router.push('/posterShare')">
          <img src="../../../../assets/images/service-7.png" alt="">
          <p>海报分享</p>
        </div>
        <div class="item">
          <img src="../../../../assets/images/service-7.png" alt="">
          <p>客服咨询</p>
        </div>
      </div>
    </div>

    <div class="service">
      <div class="top">会员服务</div>
      <div class="bottom">
        <div class="item">
          <img src="../../../../assets/images/service-1.png" alt="">
          <p>我的店铺</p>
        </div>
        <div class="item" @click="$router.push('/alliance')">
          <img src="../../../../assets/images/service-2.png" alt="">
          <p>商家联盟</p>
        </div>
        <div class="item" @click="$router.push('/achievenment')">
          <img src="../../../../assets/images/service-3.png" alt="">
          <p>我的成绩</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get} from "../../../../services/user";
  import { Dialog } from 'vant';
  export default {
    data() {
      return {
        user:{
          avatar:'',
          nickname:'',
          grade:'',
        },
        show: false,
        show2: false,

      }
    },
    computed:{
      id() {
        return this.$store.state.user.id
      }
    },
    methods:{
      // 显示隐藏眼睛
      eye() {
        this.show = !this.show
      },
      eye2() {
        this.show2 = !this.show2
      },
      toProfile() {
        this.$router.push('/userInfo/' + this.user.id)
      },
      changeRole() {
          Dialog.confirm({
            message: '你当前为普通用户角色，是否切换为合伙人角色？',
          })
            .then(() => {
              if(this.user.identityStatus === '待购买') {
                Dialog.confirm(
                  {
                    message:'请先购买会员礼包'
                  }
                ).then(() => {
                  this.$router.push('/vipGift')
                })
              }
            })

        }

    },
    mounted() {
      this.$nextTick(() => {
        const user = JSON.parse(localStorage.getItem('userMsg'))
        if(user && typeof user ==='object' && user.hasOwnProperty('id')) {
          get({
            id:user.id
          },res => {
            this.user = res
          })
        } else {
          this.$toast('您未登录账号')
          this.$router.push('/userLogin')
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .mine {
    background-color: #FAFAFA;
    height: 100vh;
    width: 100%;

    .userInfo {
      width: 100%;
      height: 6.6rem;
      background: linear-gradient(0deg, rgba(255, 108, 88, 0.71), rgba(228, 59, 55, 0.71), rgba(255, 144, 117, 0.71));
      position: relative;

      .userInfo-top {
        overflow: hidden;
        margin-left: 0.6rem;
        .setting {
          position: absolute;
          top: 0.48rem;
          right: 2.28rem;
        }
        .changeRole {
          position: absolute;
          top: 0.48rem;
          right: 0.8rem;
        }

        .avatar {
          float: left;
          width: 3rem;
          height: 3rem;
          margin-top: 0.6rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .other {
          float: left;
          margin-left: 0.76rem;

          .p1 {
            margin-top: 15px;
            position: relative;

            span {
              display: inline-block;
              width: 3rem;
              height: 0.8rem;
              font-size: 0.72rem;
              font-family: PingFang SC;
              /*font-weight: bold;*/
              color: rgba(255, 255, 255, 1);
              line-height: 0.84rem;
            }

            .vip {
              background-color: #FF0909;
              font-size: 0.4rem;
              height: 0.8rem;
              text-align: center;
              border-radius: 0.4rem;
              position: absolute;
              left: 54px;
              top: 0;
            }
          }

          .p2 {
            span {
              display: inline-block;
              background-color: #FF0909;
              width: 2.36rem;
              height: 0.76rem;
              font-size: 0.44rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 0.84rem;
              text-align: center;
              border-radius: 0.38rem;
            }
          }
        }
      }

      .protect {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .userInfo-bottom {
          width: 11.8rem;
          height: 1.8rem;
          background-color: #333333;
          border-top-left-radius: 0.6rem;
          border-top-right-radius: 0.6rem;
          display: flex;
          .first {
            width: 4.8rem;
            height: 1.78rem;
            display: flex;
            .money {
              display: inline-block;
              height: 1.78rem;
              line-height: 1.48rem;
              width: 1rem;
              font-size: 0.44rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(222, 193, 151, 1);
              margin-left: 0.48rem;
            }
            .money-son {
              display: inline-block;
              width: 1rem;
              padding-top: 0.5rem;
              padding-left: 0.5rem;
              font-size: 0.72rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: #FFFFFF;

            }
            img {
              padding-top: 0.5rem;
              padding-left: 0.4rem;
              width: 0.56rem;
              height:0.3rem;
            }
            .jumbTo {
              width: 0.38rem;
              height: 0.66rem;
              padding-left: 1rem;
            }
          }
          .first:last-child {
            flex: 1;
          }


        }
      }
    }

    .order {
      width: 100%;
      height: 4.6rem;
      background-color: white;

      .top {
        height: 1.6rem;
        width: 100%;
        /*background-color: #5ac55a;*/

        .myOrder {
          font-size: 0.64rem;
          font-family: PingFang SC;
          /*font-weight:bold;*/
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 0.84rem;
          margin-left: 0.8rem;
        }

        .allOrder {
          font-size: 0.44rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(119, 119, 119, 1);
          line-height: 0.84rem;
          margin-left: 7.72rem;
        }

        img {
          width: 0.2rem;
          height: 0.4rem;
          position: relative;
          top: 1px;
        }
      }

      .bottom {
        height: 3rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 0.2rem;

        .item {
          width: 1.36rem;

          img {
            width: 1.48rem;
            height: 1.36rem;
          }

          p {
            width: 1.44rem;
            height: 0.44rem;
            font-size: 0.44rem;
            font-family: PingFang SC;
            /*font-weight:bold;*/
            color: rgba(51, 51, 51, 1);
            line-height: 0.84rem;
            text-align: center;
          }
        }
      }
    }

    .service {
      margin-top: 0.4rem;
      background-color: white;
      width: 100%;
      height: 7.6rem;

      .top {
        height: 1.6rem;
        width: 100%;
        /*background-color: #5ac55a;*/
        font-size: 0.64rem;
        font-family: PingFang SC;
        /*font-weight:bold;*/
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1.6rem;
        padding-left: 0.8rem;
        box-sizing: border-box;
      }

      .bottom {
        display: flex;
        width: 100%;
        height: 3rem;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
        padding-top: 0.2rem;
        box-sizing: border-box;

        .item {
          text-align: center;
          img {
            width: 1.44rem;
            height: 1.28rem;
          }
          p {
            /*width: 1.36rem;*/
            height: 0.44rem;
            font-size: 0.44rem;
            font-family: PingFang SC;
            /*font-weight:bold;*/
            color: rgba(51, 51, 51, 1);
            line-height: 0.84rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
