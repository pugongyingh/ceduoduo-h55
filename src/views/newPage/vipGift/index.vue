<template>
    <div class="vipGift">
<!--      返回按钮-->
      <div class="back" @click="$router.push('/mine')">
        <van-icon name="arrow-left" color="#fff" />
      </div>
<!--      轮播图-->
      <div class="swiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-if="product.covers !== ''" v-for="(item,index) in product.covers.split(';')" :key="index">
            <img :src="item" alt="" style="width: 100%;">
          </van-swipe-item>
        </van-swipe>
      </div>
<!--      标题-->
      <div class="title">
        <p style="font-size: 15px">{{product.name}}</p>
        <p style="font-size: 28px;margin-top: 0.96rem "><i style="font-size: 10px;font-style: normal;">￥</i>{{product.price}}</p>
      </div>

<!--      选择分类-->
      <div class="partner shadowBox" @click="chooseParam">
        <span style="font-size: 14px;color:#9A9A9A;left: 0.56rem">选择</span>
        <span style="font-size: 14px;right:1.24rem;">
          请选择规格
        </span>
        <van-icon class="icon" style="position:absolute;right: 0.52rem" size="14" name="arrow" />
      </div>

<!--      商品详情-->
      <p class="good-detail" style="font-size: 0.64rem">商品详情</p>
      <div class="imgContainer" v-html="product.description">
<!--        <img v-for="item in 6" src="../../../assets/images/ceshi.jpg" alt="">-->
      </div>

<!--      立即购买按钮-->
      <div class="fake-bottom">
      </div>
      <div class="buy" @click="toBuy">
        立即购买
      </div>



      <!--  规格选择-->
      <van-popup class="popup" v-model="show" position="bottom" :style="{ height: '70%' }">
        <div class="top">
          <img style="width: 4rem;height:4rem;" :src="product.logo" alt="">
          <span class="nowprice">{{salePrice}}</span>
          <span class="originprice">{{originalPrice}}</span>
          <van-icon style="top:1.44rem;position:absolute;right:0.6rem;color:#eee; " name="cross" @click="show = false" />
        </div>

        <p style="font-size: 13px;padding:0.2rem 0.6rem;color:#999999;">请选择规格</p>

        <div style="height: 4rem" v-for="(item,index) in specification" :key="index">
          <p style="font-size: 13px;padding:0.2rem 0.6rem;color:#333;">{{item.specificationName}}</p>
          <div
            :class="{'button':true,'active':item.specificationName === '页数'? sizeIdList.indexOf(option.optionId) !== -1:materialIdList.indexOf(option.optionId) !== -1}"
            v-for="(option,i) in item.optionFieldDTOList"
            :key="i"
            @click="selectChange(item.specificationName,option.optionId)">
            {{option.optionName}}
          </div>
        </div>
      </van-popup>

    </div>
</template>

<script>
  import {get} from "../../../services/platformProduct";
  import {findByPlatformProduct} from "../../../services/specification";
  import {findByPlatformProductAndOptions} from "../../../services/goods";
  import {Toast} from 'vant'

  export default {
        name: "index",
      data() {
          return {
            show:false,
            product:{
              covers:''
            },
            specification:[],
            materialIdList:[],
            sizeIdList:[],
            originalPrice:'',
            salePrice:''
          }
      },
    watch:{
      materialIdList(val) {
        this.getPrice()
      },
      sizeIdList(val) {
        this.getPrice()
      }
    },
      methods:{
          chooseParam() {
            this.show = true
          },
        toBuy() {
            if(this.materialIdList.length === 0 || this.sizeIdList.length === 0) {
              Toast('请先选择规格')
            } else {
              this.$router.push(`/vipGiftOrder?materialId=${this.materialIdList[0]}&sizeIdList=${this.sizeIdList[0]}`)
            }
        },
        selectChange(type,id) {
            switch (type) {
                case '页数':
                  if(this.sizeIdList[0] !== id || this.sizeIdList.length === 0) {
                    this.sizeIdList.shift()
                    this.sizeIdList.push(id)
                  } else if (this.sizeIdList[0] == id) {
                    this.sizeIdList.shift()
                  }
                  break
                case '材质':
                  if(this.materialIdList[0] !== id || this.materialIdList.length === 0) {
                    this.materialIdList.shift()
                    this.materialIdList.push(id)
                  } else if (this.materialIdList[0] == id) {
                    this.materialIdList.shift()
                  }
            }
        },
        getPrice() {
          findByPlatformProductAndOptions({
            materialIdList: this.materialIdList,
            sizeIdList: this.sizeIdList,
            platformProductId:4
          },price => {
            if(price.length !== 0) {
              this.originalPrice = price[0].originalPrice
              this.salePrice = price[0].salePrice
            } else {
              this.originalPrice = ''
              this.salePrice = ''
            }

          })
        }
      },
      created() {
          get({id:4},res => {
            this.product = res
            this.$nextTick(() => {
              const desc = document.querySelector('.imgContainer')
              console.log(desc)
              let imgList = desc.querySelectorAll('img')
              imgList.forEach(v => {
                v.style.marginTop = '0.6rem'
                v.style.width = '13.8rem'
                v.style.height = '24rem'
                v.style.borderRadius = '3px'
              })
            })
          })

        findByPlatformProduct({platformProduct:{
          id:4
          }},res => {
              this.specification = res

        })


      }
    }
</script>

<style scoped lang="less">
  .my-swipe {
    height: 15rem;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 15rem;
    text-align: center;
    background-color: #39a9ed;
  }
  .back {
    z-index: 99;
    position: fixed;
    background-color: rgba(0,0,0,.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    left: 0.6rem;
    top: 0.4rem;
  }

  .title {
    width: 100%;
    height: 92px;
    background-color: #fff;
    p {
      margin-top: 0.4rem;
      margin-left: 0.6rem;
    }
  }

  .partner {
    display: flex;
    align-items: center;
    margin:0.6rem auto ;
    position: relative;
    width: 13.8rem;
    height: 1.76rem;
    border-radius: 0.4rem;
    line-height: 1.76rem;
    span {
      position: absolute;
      color: #343434;
    }
  }

  .good-detail {
    margin: 1rem;
  }

  .imgContainer {
    padding: 0.6rem;
    img {
      margin-top: 0.6rem;
      width: 13.8rem;
      height: 7.2rem;
      border-radius: 3px;
    }
  }

  .fake-bottom {
    width: 100%;
    height: 1.8rem;
    margin-bottom: 0;
  }
  .buy {
    width: 100%;
    height: 1.8rem;
    background-color: #DD0B14;
    text-align: center;
    line-height: 1.8rem;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 16px;
    color: white;
    z-index: 10000000000;
  }

  .top {
    height: 3.68rem;
    width: 100%;
    position: relative;
    line-height: 3.68rem;
    img {
      position: absolute;
      left: 0.54rem;
      top: -0.32rem;
      border-radius: 0.4rem;
    }
    .nowprice {
      position: absolute;
      left: 5.1rem;
      font-size: 25px;
      color: #DD0B14;
    }
    .originprice {
      position: absolute;
      left: calc(0.54rem + 4rem + 3.26rem);
      font-size: 14px;
      text-decoration: line-through;
    }
  }

  .popup {
    overflow: visible;
  }

  .button {
    width: 4rem;
    height: 1.2rem;
    border-radius: 2px;
    text-align: center;
    line-height: 1.2rem;
    font-size: 12px;
    float: left;
    margin-top: 0.6rem;
    margin-left: 0.2rem;
  }

  .active {
    background-color:#DD0B14 ;
    color: white;
  }
</style>
