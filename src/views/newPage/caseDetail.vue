<template>
  <div class="caseDetail">
    <van-nav-bar
      title="案例详情"
      left-arrow
    />
    <div class="videoBox">
    </div>
    <div class="videoDesc">
      <p class="title">视频标题多多视频标题多多视频标题多多</p>
      <p class="content">视频描述多多视频描述多多视频描述多多视频描述多多视频描述多多视频描述多多</p>
    </div>
    <div class="recommend">
      <div class="top">
        <span class="sp1">相关推荐</span>
        <span class="sp2">更多</span>
        <img src="../../assets/images/shop-more.png" alt="">
      </div>
      <div class="box">
        <div class="item" v-for="i in 4">
          <img src="../../assets/images/ceshi.jpg" alt="">
          <p>最美春天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      onSubmit(){}
    }
  }
</script>

<style lang="less" scoped>
  .caseDetail {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .van-nav-bar .van-icon {
      color:#666666;
    }
    .videoBox {
      height: 8rem;
      width: 100%;
      background-color: pink;
    }
    .videoDesc {
      width: 100%;
      height: 3.4rem;
      background-color: white;
      padding: 0.64rem;
      box-sizing: border-box;
      .title {
        font-size:0.6rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(51,51,51,1);
        line-height:0.72rem;
      }
      .content {
        font-size:0.48rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:0.72rem;
        margin-top: 0.32rem;
      }
    }

    .recommend {
      width: 100%;
      height: 7.2rem;
      background-color: white;
      margin-top: 0.6rem;
      padding: 0.4rem 0.6rem;
      box-sizing: border-box;
      .top {
        overflow: hidden;
        position: relative;
        .sp1 {
          float: left;
          font-size:0.6rem;
          font-family:PingFang SC;
          /*font-weight:bold;*/
          color:rgba(51,51,51,1);
        }
        .sp2 {
          position: absolute;
          right: 0.48rem;
          font-size:0.4rem;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(119,119,119,1);
          top: 50%;
          transform: translateY(-50%);
        }
        img  {
          position: absolute;
          right: 0;
          float: right;
          width: 0.2rem;
          height: 0.4rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .box {
        display: flex;
        justify-content: space-between;
        overflow-y: auto;
        .item {
          text-align: center;
          margin-right: 1rem;
          img {
            width: 3.4rem;
            height: 4.56rem;
            margin-top: 0.48rem;
          }
          p {
            text-align: center;
            font-size:0.44rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
  }
</style>
