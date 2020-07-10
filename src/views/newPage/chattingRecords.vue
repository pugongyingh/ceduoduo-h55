<template>
  <div class="chattingRecords">
    <div class="top">
      <img src="../../assets/images/back-left.png" alt="">
      <van-search v-model="value" placeholder="请输入搜索关键词"/>
    </div>
    <div class="center">
      聊天记录
    </div>
    <div class="list">
      <div class="item">
        <div class="avatar">
          <img src="../../assets/images/b_pic_statue.jpg" alt="">
        </div>
        <div class="message">
          <p class="p1">赵新生</p>
          <p class="p2">
            经理，聊天对话中搜索到
          </p>
        </div>
      </div>
    </div>
    <van-divider />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value:''
      }
    }
  }
</script>

<style lang="less" scoped>
  .chattingRecords {
    .top {
      width: 100%;
      height: 2.16rem;
      /*background-color: #9D3024;*/
      position: relative;

      img {
        position: absolute;
        left: 0.32rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.4rem;
        height: 0.68rem;
      }

      .van-search {
        position: absolute;
        right: 0;
        width: 95%;
      }
    }
    .center {
      height: 1.92rem;
      width: 100%;
      background-color: #FCFAFA;
      font-size:0.56rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height: 1.92rem;
      padding-left: 0.6rem;
      box-sizing: border-box;
    }
    .list {
      overflow: hidden;
      padding: 0.64rem;
      box-sizing: border-box;
      .item {
        .avatar {
          float: left;
          width: 1.8rem;
          height: 1.8rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .message {
          float: left;
          margin-left: 0.8rem;
          .p1 {
            font-size:0.56rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .p2 {
            font-size:0.48rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(221,11,20,1);
            margin-top: 0.44rem;
          }
        }
      }
    }
  }
</style>
