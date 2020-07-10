<template>
  <div class="deskCalendar">
    <van-nav-bar
      title="台历"
      left-arrow
    />
    <div v-if="false">
      <div class="nav">
        <span v-for="(item,index) in navList" :class="[activeIndex === index ? 'active' : '']" @click="activeIndex = index">{{item}}</span>
      </div>
      <div class="list">
        <div class="card" v-for="i in 4">
          <img src="../../assets/images/ceshi.jpg" alt="">
          <p class="title">模板名称</p>
          <p class="desc">365张照片</p>
        </div>
      </div>
    </div>

    <div v-if="true">
      <div class="nav">
        <span v-for="(item,index) in navListCopy" :class="[activeIndex === index ? 'active' : '']" @click="activeIndex = index">{{item}}</span>
      </div>
      <div class="list">
        <div class="card" v-for="i in 4">
          <img src="../../assets/images/ceshi.jpg" alt="">
          <p class="title" style="text-align: left;padding: 0 0.48rem">模板名称</p>
          <p class="desc" style="text-align: left;padding: 0 0.48rem">365张照片 <span style="float: right;color: black">免费</span> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navList:['全部','亲子','旅游','时尚','青春'],
        activeIndex:0,
        navListCopy:['全部','2019台历','2020台历']
      }
    },
    methods:{
      onSubmit(){}
    }
  }
</script>

<style lang="less" scoped>
  .deskCalendar {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .van-nav-bar .van-icon {
      color:#666666;
    }
    .nav {
      width: 100%;
      height: 1.6rem;
      background-color: white;
      display: flex;
      justify-content: space-around;
      padding: 0.32rem 0;
      box-sizing: border-box;
      span {
        font-size:0.56rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(51,51,51,1);
        /*line-height: 1.6rem;*/
      }
      .active {
        border-bottom: 2px solid #DD0B14;
        color:rgba(221,11,20,1);
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .card {
        width: 6.56rem;
        height: 7.4rem;
        background-color: white;
        margin-top: 1rem;
        box-shadow:1px 2px 22px 0px rgba(227,227,227,0.65);
        border-radius:11px;
        overflow: hidden;
        img {
          width: 100%;
          height: 4.72rem;
        }
        .title {
          font-size:0.6rem;
          font-family:PingFang SC;
          /*font-weight:bold;*/
          color:rgba(51,51,51,1);
          line-height:0.92rem;
          text-align: center;
          margin-top: 0.22rem;
        }
        .desc {
          text-align: center;
          font-size:0.52rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(153,153,153,1);
          margin-top: 0.22rem;
        }
      }
    }
  }
</style>
