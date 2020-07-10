<template>
  <div class="albumDetail">
    <van-nav-bar
      left-arrow
      @click-left="$router.go(-1)"
      z-index = 1
    />
    <van-swipe class="my-swipe" @change="onChange">
      <van-swipe-item v-for="item in picList">
        <img :src="item" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{picList.length}}
        </div>
      </template>
    </van-swipe>

    <div class="detail-msg">
      <p class="name">{{good.name}}</p>
      <p class="price">￥{{good.price||good.salePrice}}</p>
      <div class="express">快递：0.00</div>
      <div class="sale">销售量：{{good.soldQuantity}}</div>
    </div>

    <div class="chooseSize">
      <span class="left">选择</span>
      <div class="right"  @click="showPopup">选择 尺寸分类<van-icon name="arrow" size="0.48rem" color="rgba(153,153,153,1)"/></div>
    </div>

    <div class="good-evaluate">
      <p class="top">商品评价（0）</p>
      <div class="down">该商品还没有评价</div>
    </div>

    <div class="good-detail">
      <p class="top">商品详情</p>
      <div class="down" id="down" v-html="good.description">

      </div>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      close-icon="cross"
      closeable
      overlay-class="overlay1"
    >
      <img :src="good.icon" alt="">

      <div class="price">
        <div class="p1">￥{{good.price||good.salePrice}}</div>
        <div class="p2">{{good.originalPrice?'￥'+good.originalPrice:''}}</div>
      </div>

      <p class="selected">已选：软壳【10-15】页</p>

      <div class="size">
        <div class="title">尺寸</div>
        <div class="size-box">
          <div class="size-item">硬壳</div>
        </div>
      </div>

      <div class="page">
        <div class="title">页数</div>
        <div class="page-box">
          <div class="page-item">【10-15页】</div>
        </div>
      </div>
      <div class="finishBtn">确定</div>
    </van-popup>
    <div class="printing" @click="showPopup">立即冲印</div>
  </div>
</template>

<script>

    export default {
        name: "albumDetail",
      data() {
        return {
          current: 0,
          show: false,
          good:{},
          picList:[]
        }
      },
      methods: {
        onChange(index) {
          this.current = index;
        },
        showPopup() {
          this.show = true;
        },
      },
      mounted() {
        this.good = this.$route.params.good
        this.picList = this.$route.params.picList
        console.log(this.good)
      }
    }
</script>

<style lang="less"  scoped>
  .albumDetail{
    margin-bottom:2.5rem ;
    .van-nav-bar{
      position: absolute;
      top: 0;
      background-color: #fff0;
    }
    .my-swipe .van-swipe-item {
      height: 15rem;
      color: #fff;
      font-size: 20px;
      text-align: center;
      background-color: #39a9ed;
      img{
        width: 15rem;
        height: 15rem;
      }
    }
    .custom-indicator {
      position: absolute;
      width: 1.8rem;
      height: 0.8rem;
      right: 5px;
      bottom: 5px;
      text-align: center;
      margin: 0 0.6rem 0.6rem 0;
      font-family: PingFang;
      font-size: 0.48rem;
      line-height: 0.8rem;
      opacity: 0.5;
      border-radius: 4px;
      color: rgba(255,255,255,1);
      background:rgba(51,51,51,1);
    }
    .detail-msg{
      height: 4.8rem;
      position: relative;
      overflow: hidden;
      .name{
        height:0.56rem;
        font-size:0.6rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:1.04rem;
        margin: 0.54rem 0 0 0.62rem;
      }
      .price{
        height:0.64rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(221,11,20,1);
        line-height:0.68rem;
        margin: 0.94rem 0 0 0.62rem;
      }
      .express{
        position: absolute;
        bottom: 0.78rem;
        left:0.62rem;
        height:0.54rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:0.72rem;
      }
      .sale{
        position: absolute;
        bottom: 0.78rem;
        right:0.62rem;
        height:0.54rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:0.72rem;
      }
    }
    .chooseSize{
      width: 13.8rem;
      height: 1.76rem;
      margin: 0.76rem auto 0;
      background:rgba(255,255,255,1);
      box-shadow:0.06rem 0.08rem 0.86rem 0px rgba(227,227,227,0.65);
      border-radius:0.4rem;
      display: flex;
      justify-content: space-between;
      align-items:center;
      .left{
        width: 1.5rem;
        height: 0.8rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:0.92rem;
        margin: 0.62rem 0.52rem;
      }
      .right{
        height: 0.8rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:0.92rem;
        margin: 0.62rem 0.52rem;
      }
    }

    .good-evaluate{
      margin: 1rem 0 0 0.66rem;
      .top{
        font-size:0.64rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.72rem;
        margin-bottom: 0.56rem;
      }
      .down{
        width:13.8rem;
        height:4.4rem;
        line-height: 4.4rem;
        font-size: 0.56rem;
        text-align: center;
        background:rgba(255,255,255,1);
        box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:0.12rem;
      }
    }

    .good-detail{
      margin: 1rem 0 0 0.66rem;
      .top{
        font-size:0.64rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.72rem;
        margin-bottom: 1.2rem;
      }
      .down{
        width:13.8rem;
        background:rgba(255,255,255,1);
        border-radius:0.12rem;
        overflow: auto;
        img{
          width: 13.8rem;
        }
      }
    }

    .van-popup{
      overflow: visible;
      img{
        width: 4rem;
        height: 4rem;
        position: absolute;
        top: -1.56rem;
        left: 0.54rem;
        background:rgba(238,238,238,1);
        border-radius:0.4rem;
      }
      .price{
        margin: 0.86rem 0 1.8rem 5.1rem;
        width: 3.5rem;
        display: flex;
        justify-content: space-between;
        .p1{
          width:1.6rem;
          height:0.64rem;
          font-size:0.56rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(221,11,20,1);
          line-height:0.68rem;
        }
        .p2{
          width:1.66rem;
          height:0.4rem;
          font-size:0.52rem;
          font-family:PingFang;
          font-weight:500;
          text-decoration:line-through;
          color:rgba(153,153,153,1);
          line-height:0.72rem;
        }
      }
      .selected{
        width: 5.66rem;
        height: 0.72rem;
        font-size: 0.52rem;
        font-family: PingFang;
        font-weight: 500;
        color: #999999;
        line-height: 0.72rem;
        margin-left: 0.58rem;
      }

      .size{
        margin: 0.98rem 0 0 0.52rem;
        overflow: hidden;
        .title{
          width:100%;
          height:0.72rem;
          font-size:0.56rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1);
          margin: 0 auto 0.56rem;
        }
        .size-box{
          display: flex;
          justify-content: flex-start;
        }
        .size-item{
          width:2.8rem;
          height:1.2rem;
          background:rgba(252,250,250,1);
          border-radius:0.08rem;
          margin-right: 0.6rem;
          font-size:0.48rem;
          line-height: 1.2rem;
          text-align: center;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1)
        }
      }
      .page{
        margin: 0.98rem 0 0 0.52rem;
        overflow: hidden;
        .title{
          width:100%;
          height:0.72rem;
          font-size:0.56rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1);
          margin: 0 auto 0.56rem;
        }
        .page-box{
          display: flex;
          justify-content: flex-start;
        }
        .page-item{
          width:4rem;
          height:1.2rem;
          background:rgba(252,250,250,1);
          border-radius:0.08rem;
          margin-right: 0.6rem;
          font-size:0.48rem;
          line-height: 1.2rem;
          text-align: center;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1)
        }
      }
      .finishBtn{
        width:15rem;
        height:1.8rem;
        background:rgba(221,11,20,1);
        line-height: 1.8rem;
        text-align: center;
        font-size:0.64rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-top: 1rem;
      }
    }
    .printing{
      position: fixed;
      bottom: 0;
      width:15rem;
      height:1.8rem;
      background:rgba(221,11,20,1);
      line-height: 1.8rem;
      text-align: center;
      font-size:0.64rem;
      font-family:PingFang;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
  }

</style>
