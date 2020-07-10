<template>
   <div class="signIn">
     <van-nav-bar
       title="我要参赛"
       left-arrow
       @click-left="$router.go(-1)"
     />
     <div class="chooseBody">
       <div class="choose">
        <p>选择作品</p>
        <div class="btn" v-show="true">
          <van-button type="warning" 
          @click="$router.push({path: '/chooseWorks', query: {storeId, contestId}})">从已有的作品选择
        </van-button>
          <van-button type="warning">创建新作品</van-button>
        </div>
         <div class="works" v-show="false">
           <img src="../../../assets/newImages/daka.jpg" alt="">
           <div class="right">
             <span>作品名称作品名称</span>
             <span>36张照片</span>
           </div>
         </div>
       </div>
     </div>

   </div>
</template>

<script>
  export default {
    name: "signIn",
    data () {
      return {
        // 关联店铺id
        storeId: null,
        // 赛事id
        contestId: null
      }
    },
    methods: {
      wantSign() {}
    },
    created() {
      this.storeId = parseInt(this.$route.query.storeId)
      this.contestId = parseInt(this.$route.query.contestId)
    }
  }
</script>

<style lang="less" scoped>
.signIn {

  .chooseBody {
    display: flex;
    justify-content: center;
    .choose {
      margin-top: 0.76rem;
      width:13.8rem;
      height:5.72rem;
      background:rgba(255,255,255,1);
      box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
      border-radius:21px;
      p {
        padding: 0.6rem;
        height:0.52rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(51,42,44,1);
      }
      .btn {
        height: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
          width:6.3rem;
          height:1.36rem;
          background:rgba(221,11,20,1);
          border-radius:34px;
        }
        button:last-child {
          margin-top: 0.3rem;

        }
      }
      .works {
        display: flex;
        padding: 0 0.6rem;
        img {
          width:5.2rem;
          height:3.9rem;
          border-radius:10px;
        }
        .right {
          display: flex;
          flex-direction: column;
          align-content: center;
          span {
            margin-top: 0.7rem;
            margin-left: 0.3rem;
            height:0.54rem;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:0.54rem;
          }
          span:last-child {
            height:0.46rem;
            font-size:0.48rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.46rem;
          }
        }
      }
    }
  }

}
</style>
