<template>
  <div class="babyDetail">
    <div class="top">
      <van-swipe :autoplay="3000" indicator-color="white" @change="currentIndexChange">
        <van-swipe-item class="banner" v-for="item in coverList">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
      <div class="back-wrap" @click="$router.go(-1)">
        <span class="back"></span>
      </div>
      <div class="count">{{currentIndex}}/{{totalNum}}</div>
    </div>
    <div class="info">
      <p class="title">{{goodsDetail.name}}</p>
      <div>
        <span class="price"><span style="font-size:0.56rem;">￥</span>{{goodsDetail.salePrice}}</span>
        <span class="oldPrice">￥{{goodsDetail.originalPrice}}</span>
      </div>
    </div>
    <div>
      <div class="desc-title">商品详情</div>
      <div ref="description" class="description"></div>
    </div>
  </div>
</template>

<script>
  import {getStoreProduct} from '@/services/storeProduct'

  export default {
    name: "babyDetail",
    data() {
      return {
        id: this.$route.query.id,
        goodsDetail: {},
        currentIndex: 1,
        totalNum: 1,
        coverList: []
      }
    },
    created() {
      getStoreProduct({id: this.id}, res => {
        this.goodsDetail = res;
        this.coverList = res.covers.split(';');
        this.totalNum = this.coverList.length;

        this.$refs.description.innerHTML = res.description;
      })
    },
    methods: {
      currentIndexChange(index) {
        this.currentIndex = index + 1;
      }
    }
  }

</script>

<style scoped lang="less">

  .babyDetail {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #FAFAFA;
    .top {
      position: relative;
      width: 100%;
      height: 15rem;
      background: #eee;
      .banner {
        width: 100%;
        height: 15rem;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .back-wrap {
        position: absolute;
        top: 1.2rem;
        left: 0.6rem;
        width: 1.4rem;
        height: 1.4rem;
        background:#333;
        border-radius:50%;
        opacity: 0.5;
        .back {
          display: block;
          height: 100%;
          width: 100%;
          background: url("../../../assets/images/b_btn_return.png") center center no-repeat;
        }
      }
      .count {
        position: absolute;
        right: 0.54rem;
        bottom: 0.6rem;
        width: 1.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.7rem;
        color: #fff;
        background:#333333;
        opacity:0.5;
        border-radius:4px;
      }
    }
    .info {
      background: #fff;
      padding: 0.6rem;
      .title {
        font-size: 0.7rem;
        color: #333;
        font-weight: bold;
        line-height: 1rem;
      }
      .price {
        font-size: 0.8rem;
        color: #DD0B14;
      }
      .oldPrice {
        color: #666;
        font-size: 0.56rem;
        text-decoration:line-through;
      }
    }
    .desc-title {
      padding-left: 0.6rem;
      height: 2.5rem;
      line-height: 2.5rem;
      color: #333;
      font-size: 0.7rem;
      font-weight: bold;
      background: #FCFAFA;
    }
    .description {
      overflow: hidden;
      padding: 5%;
      width: 90%;
      /deep/p {
        font-size: 0.7rem;
        text-indent: 1.4rem;
        img {
          margin-left: -1.4rem;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }

</style>
