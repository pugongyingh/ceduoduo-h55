<template>
  <div class="tempDetail">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">{{detail.templateName}}</div>
      <span class="btn" @click="toastToApp">下一步</span>
    </div>
    <div class="content">
      <div class="btn-warpper">
        <span class="btn" @click="toastToApp">选择音乐</span>
        <span style="font-size: 0.56rem;float: right;">所需照片：{{detail.number}}张</span>
      </div>
<!--      模板的内容区-->
      <ul class="temp-wrap">
        <li class="temp-item" v-for="(item,index) in coverList" @click="toastToApp">
          <img class="temp-img" :src="item" alt="">
          <span class="temp-title">{{index + 1}}P</span>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="fav" @click="toastToApp">
        <img src="../../../assets/images/favourite.png" style="" alt=""/>
        <p style="font-size:0.4rem; vertical-align:top;">收藏</p>
      </div>
      <van-button type="default" @click="toastToApp">保存作品</van-button>
    </div>
  </div>
</template>

<script>
  import {findDetailById} from '@/services/template'

  export default {
    name: "tempDetail",
    data() {
      return {
        detail: {},
        coverList: []
      }
    },
    mounted() {
      this.get()
    },
    methods: {
      get() {
        let param = {
          id: Number(this.$route.query.tempId)
        };

        findDetailById(param, res => {
          this.detail = res;
          this.coverList = JSON.parse(res.path).map(item => {
            return item.cover;
          })
        });
      },
      //下一步按钮
      toastToApp() {
        this.$toast('请使用app制作相册');
      }
    }
  }

</script>

<style scoped lang="less">

  .tempDetail {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .top {
      border-bottom: 1px solid #E6E6E6;
      /*width: 15rem;*/
      height: 2rem;
      line-height: 2rem;
      position: relative;
      .nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.72rem;
        font-family:PingFang;
        font-weight:bold;
      }
      .fanhui {
        position: absolute;
        left: 0.68rem;
        top: 0.6rem;
        width: 0.4rem;
        height: 0.78rem;
      }
      .btn {
        float: right;
        color: #333333;
        font-size: 0.65rem;
        margin-right: 0.5rem;
      }
    }
    .content {
      overflow: hidden;
      margin-bottom: 2rem;
      padding: 0 0.62rem;
      .btn-warpper {
        height: 2.56rem;
        line-height: 2.56rem;
        .btn {
          display: inline-block;
          width: 4rem;
          height: 1.2rem;
          line-height: 1.2rem;
          background: #DD0B14;
          border-radius: 0.16rem;
          font-size: 0.52rem;
          color: #fff;
          text-align: center;
        }
      }
      .temp-wrap {
        text-align: center;
        .temp-item {
          margin: 0.3rem 0 0.9rem;
          .temp-img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
            object-fit: contain;
          }
          .temp-title {
            font-size:0.52rem;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      background: #fff;
      .fav {
        overflow: hidden;
        position: absolute;
        left: 1.5rem;
        top: 50%;
        height: 100%;
        transform: translateY(-50%);
        img {
          position: absolute;
          top: 0.24rem;
          left: 0.1rem;
          width: 0.8rem;
          height: 0.8rem;
        }
        p {
          line-height: 3rem;
        }
      }
      .van-button {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        border-color: #999;
        width: 4rem;
        height: 1.3rem;
      }
    }
  }

</style>
