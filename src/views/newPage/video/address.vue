<template>
    <div class="addressManagement">
<!--      <div class="childBox" v-show="a"><router-view></router-view></div>-->
<!--      导航栏-->
      <div class="navbar">
        <van-nav-bar
          title="收货地址管理"
          left-arrow
          @click-right="$router.push('/videoAddAddress/' + id)"
          @click-left="back"
        />
      </div>

<!--        地址列表-->
        <div class="addressList">
          <div class="addressItem" v-for="(item,index) in addressList">
              <div class="item">
                <div class="left">
                  <div class="name">
                    <span>{{item.realName}}</span>
                    <span>{{item.phone}}</span>
                    <span :class="{'default':item.isdefault}">默认</span>
                  </div>
                  <div class="address">
                    <p>{{item.detail}}</p>
                  </div>
                </div>
                <div class="right" @click="chooseAddress(item)">
                  <span>选择</span>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
  import {findAddressById} from "../../../services/address";

  export default {
    name: "videoAddress",
    data() {
        return {
          addressList:[],
          c_good:this.good
        }
      },
      props:['good'],
      methods:{
        back(){
          this.$router.go(-1)
          this.$emit('back')
        },
        chooseAddress(item){
          this.$router.go(-1)
          this.$emit('back')
          this.$emit('choseAddress',item)
        }
      },
      created() {
        findAddressById({id:JSON.parse(localStorage.getItem("userMsg")).id},res=>{
          this.addressList = res
        })
      }
    }
</script>

<style scoped lang="less">

  .childBox{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1000;
    background: rgb(255, 255, 255);
  }

  .addressList {
    width: 100%;
  }
  .default {
    background: #FBCCD1;
    color: #ED001A;
    width: 1.12rem;
  }
  .addressItem {
    border-bottom: 1px solid #E5EBF0;
    width: 100%;
    height: 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    .item {
      height: 2.32rem;
      display: flex;
      .left {
        box-sizing: border-box;
        padding-left: 0.62rem;
        padding-right: 0.62rem;
        width: 12.36rem;
        color: #333333;
        border-right: 1px solid #333333;
        .address {
          margin-top: 4px;
        }
      }
      .right {
        width: 2.64rem;
        line-height: 2.32rem;
        text-align: center;
        color: #ED001A;
      }
    }
  }
</style>
