<template>
  <div class="albumDetail">
    <div class="back"><i class="van-icon van-icon-arrow-left" style="color: white;font-size: 18px;" @click="$router.go(-1)"></i></div>
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
      <p class="top">商品评价（{{commentCount}}）</p>
      <div class="down" v-if="comment.length==0">该商品还没有评价</div>
      <div class="down" v-if="comment.length>0">
        <div :class='["com-box",index<3&&index!=comment.length-1? "com-border" : ""]' v-for="(item,index) in comment" v-if="index<4">
          <div class="com-top">
            <img class="head" :src="item.userAvatar" alt="">
            <p class="name">{{item.userName}}</p>
          </div>
          <div class="com-bottom">
            <p>{{item.content}}</p>
            <div class="comImg-box" v-if="item.hasOwnProperty('images')&&item.images!=''">
              <img :src="img" alt="" v-for="img in item.images.split(',')" >
            </div>
          </div>
        </div>
      </div>
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
      <img :src="good.logo||good.thumbnail" alt="" v-show="show">

      <div class="price">
        <div class="p1">￥{{good.price||good.salePrice}}</div>
        <div class="p2">{{good.originalPrice?'￥'+good.originalPrice:''}}</div>
      </div>

      <p class="selected">已选：{{chosenSpec.reduce(function (total, currentValue, currentIndex, arr) {
        if(total!='') return total + '+' +currentValue;
        return total + currentValue;
        },'')}}</p>

      <div class="specification" v-for="(item1,index1 ) in specification">
        <div class="title">{{item1.specificationName}}</div>
        <div class="specification-box">
          <div
            :class='["specification-item",item2.active? "item-active" : ""]'
            v-for="(item2,index2) in item1.optionFieldDTOList"
            @click="checkSpecification(index1,index2)"
          >{{item2.optionName}}</div>
        </div>
      </div>
      <div class="finishBtn" @click="toOrder">确定</div>
    </van-popup>
    <div class="printing" @click="showPopup">立即冲印</div>
  </div>
</template>

<script>
    import {findByPlatformProduct} from '@/services/specification'
    import {countByPlatformProductId,findByPlatformProductId} from '@/services/comment'
    import {get} from '@/services/platformProduct'
    import {getStoreProduct} from '@/services/storeProduct'
    import eventBus from '@/services/eventBus';
    export default {
      name: "albumDetail",
      data() {
        return {
          current: 0,
          show: false,
          commentCount:0,
          comment:[],
          good:{},
          picList:[],
          specification:[],
          chosenSpec:[],
          goodId:''
        }
      },
      methods: {
        onChange(index) {
          this.current = index;
        },
        showPopup() {
          this.show = true;
        },
        checkSpecification(i1,i2){
          this.specification[i1].optionFieldDTOList.forEach(function (item) {
            item.active = false
          })
          this.specification[i1].optionFieldDTOList[i2].active = true
          this.chosenSpec[i1] = this.specification[i1].optionFieldDTOList[i2].optionName
        },
        toOrder(){
          this.show = false;
          this.$router.push({
            name: 'videoOrder',
            params: {
              good:this.good,
              chosenSpec:this.chosenSpec
            }
          })
        },
        initData(good){
          let that = this
          this.good = good
          this.picList = good.covers.split(';')
          findByPlatformProduct({
            platformProduct:{id:good.id}
          },res=>{
            res.forEach(function (item) {
              item.optionFieldDTOList.forEach(function (item2,index) {
                if(index==0){
                  that.$set(item2, "active", true)
                  that.chosenSpec.push(item2.optionName)
                }else{
                  that.$set(item2, "active", false)
                }
              })
            })
            this.specification = res
          })
          countByPlatformProductId({platformProductId:good.id},res=>{
            this.commentCount = res
          })
          findByPlatformProductId({
            platformProductId:good.id,
            "pageable": {
              "page": 1,
              "size": 10,
              "sort": {
                "desc": [
                  "id"
                ]
              }
            }
          },res=>{
            this.comment = res
          })
        }
      },
      created() {
        let that = this
        this.goodId = this.$route.query.goodId
        switch (this.$route.query.url) {
          case 'getStoreProduct':
            getStoreProduct({id:that.goodId},res=>{
              this.initData(res)
            })
            break;
          case 'get':
            get({id:that.goodId},res=>{
              this.initData(res)
            })
            break;
        }
      },
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
    .back {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 10;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      text-align: center;
      line-height: 35px;
      background-color: #868686;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
    .my-swipe{
      .van-swipe-item {
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
        min-height:4.4rem;
        line-height: 4.4rem;
        font-size: 0.56rem;
        text-align: center;
        background:rgba(255,255,255,1);
        box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:0.12rem;
        padding: 0.16rem 0 0;
        overflow: hidden;
        .name{
          font-size: 0.56rem;
          line-height: 0.72rem;
          text-align: left;
          /* text-indent: 0.2rem; */
          margin: auto 0.5rem;
        }
        .com-border{
          border-bottom: 1px solid #f5f3f3;
        }
        .com-box{
          margin: 0.5rem;
          .com-top{
            height: 1.4rem;
            padding: 0 0.3rem;
            display: flex;
            justify-content: left;
            .head{
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              margin: auto 0;
            }
            span{
              font-size: 0.64rem;
              line-height: 0.8rem;
              color: #666666;
              text-indent: 1rem;
            }
          }
          .com-bottom{
            p{
              font-size: 0.56rem;
              line-height: 0.72rem;
              margin: 0.36rem 0.2rem;
              text-align: left;
            }
            .comImg-box{
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-pack: distribute;
              justify-content: left;
              overflow-x: auto;
              margin: 0.2rem 0.2rem 0.2rem 0.2rem;
              img{
                width: 2rem;
                height: 2rem;
                margin: 0.2rem 0.2rem 0.2rem 0;
              }
            }
          }
        }
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
        transition: transform .3s;
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
        width: 100%;
        height: 0.72rem;
        font-size: 0.52rem;
        font-family: PingFang;
        font-weight: 500;
        color: #999999;
        line-height: 0.72rem;
        margin: 0 0.58rem;
      }
      .specification{
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
        .specification-box{
          display: flex;
          justify-content: flex-start;
        }
        .item-active{
          background:rgba(221,11,20,1) ;
          color:rgba(255,255,255,1);
        }
        .item-normal{
          background:rgba(252,250,250,1);
          color:rgba(51,51,51,1)
        }
        .specification-item{
          width:2.8rem;
          height:1.2rem;
          border-radius:0.08rem;
          margin-right: 0.6rem;
          font-size:0.48rem;
          line-height: 1.2rem;
          text-align: center;
          font-family:PingFang;
          font-weight:500;
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
