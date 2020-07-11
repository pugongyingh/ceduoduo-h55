<template>
  <div class="shopBaby">
<!--    顶部-->
    <div class="faketop" style="height: 8.8rem;width: 100%">

    </div>
    <div class="top">
<!--      顶部搜索框-->
      <div class="bg"></div>
      <div class="search-wrap">
        <van-search placeholder="拼多多创始联盟" @focus="toSearch" shape="round"></van-search>
        <span class="saoyisao"></span>
      </div>
<!--      轮播图-->
      <div class="shopShow">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#999" >
          <van-swipe-item v-for="item in storeBanner" :key="item">
            <img style="width: 100%;height:5rem" :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
        <div class="swiper-bottom">
          <img :src="storeInfo.cover" alt="" style="width: 1.32rem;height:1.32rem;left: 0.24rem;border-radius: 50%">
          <p style="font-size: 15px;top:-0.08rem;left: 1.76rem">{{storeInfo.name}}</p>
          <p style="font-size: 10px;top: 0.92rem;left: 1.76rem">{{storeInfo.allianceName}}</p>
          <img style="width: 0.74rem;height: 0.66rem;right: 1.76rem" src="../../../assets/newImages/guanzhu.png" alt="">
          <img style="width: 0.74rem;height: 0.66rem;right: 0.36rem" src="../../../assets/newImages/share.png" alt="">
        </div>
      </div>
    </div>

<!--    tabcontrol-->
    <div class="fakenav" style="height: 1.84rem;width: 100%;"></div>
    <div class="nav">
      <span :class="[activeIndex === index ? 'active' :'','item']" v-for="(i,index) in navList" :key="index" @click="activeIndex = index">{{i}}</span>
    </div>

<!--    社群联盟-->
    <div class="league" v-if="activeIndex === 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经到底了~"
        @load="searchLeagueAction"
      >
        <div class="list">
          <!--        联盟列表-->
          <div class="card" v-for="item in leagueList">
            <div class="showImg">
              <img :src="item.cover" alt="">
            </div>
            <div class="otherInfo">
              <div class="title">{{item.storeName}}</div>
              <div class="area">{{item.storeAddress}}</div>
              <div class="phone">{{item.storePhone}}</div>
              <div class="price">
                <span>粉丝数：{{item.fansQuantity}}</span>
                <span>浏览数：{{item.viewQuantity}}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>

<!--    首页-->
    <div class="homePage" v-if="activeIndex === 1">
      <div class="otherNav">
        <div class="item">
          <img src="./../../../assets/images/nav-1.png" alt="">
          <p>推荐</p>
        </div>
        <div class="item">
          <img src="./../../../assets/images/nav-2.png" alt="">
          <p>大赛评选</p>
        </div>
        <div class="item">
          <img src="./../../../assets/images/nav-3.png" alt="">
          <p>直播专区</p>
        </div>
        <div class="item">
          <img src="./../../../assets/images/nav-4.png" alt="">
          <p>更多</p>
        </div>
      </div>
      <div class="fakeotherNav">
        <div class="item">
          <img src="./../../../assets/images/nav-1.png" alt="">
          <p>社群联盟</p>
        </div>
        <div class="item">
          <img src="./../../../assets/images/nav-2.png" alt="">
          <p>大赛评选</p>
        </div>
        <div class="item">
          <img src="./../../../assets/images/nav-3.png" alt="">
          <p>直播专区</p>
        </div>
        <div class="item">
          <img src="./../../../assets/images/nav-4.png" alt="">
          <p>更多</p>
        </div>
      </div>

      <div class="imgContainer" style="width: 100%" v-for="(item,i) in this.image">
        <span v-for="a in item" style="width: 100%;height: 100%" v-if="item.length === 3">
        <img style="width: 33%;height:50%;margin-left: 1px" :src="a.image" alt="">
<!--       <img style="width: 33.5%;height:100%" src="../../../assets/images/ceshi.jpg" alt="">-->
        </span>
        <span v-for="a in item" style="width: 100%;height: 100%" v-if="item.length === 4">
        <img style="width: 24.5%;height:50%;margin-left: 1px" :src="a.image" alt="">
          <!--       <img style="width: 33.5%;height:100%" src="../../../assets/images/ceshi.jpg" alt="">-->
        </span>
      </div>
    </div>

<!--    宝贝-->
    <div class="baby" v-if="activeIndex === 2">
      <div class="list">
<!--        条件筛选-->
        <div class="choose">
          <div class="list" v-for="(item,i) in chooseList">
            <span :class="{mainActive: chooseIndex===i}" @click="handleIndex(i)">
              {{item}}
            <div v-if="i==3">
              <img src="../../../assets/newImages/shang.png" alt="">
              <img src="../../../assets/newImages/xia.png" alt="">
            </div>
              <div v-if="i==4">
              <img style="width: 0.52rem;height: 0.46rem;" src="../../../assets/newImages/shaixuan.png" alt="">
            </div>
            </span>
          </div>
        </div>
<!--        宝贝列表-->
        <div class="card" v-for="item in goods" @click="viewBabyDetail(item.categoryId)">
          <div class="showImg">
            <img :src="item.thumbnail" alt="">
          </div>
          <div class="otherInfo">
            <div class="title">{{item.name}}</div>
            <div class="area">{{item.storeAddress}}</div>
            <div class="price">
              <div>
                ￥{{item.salePrice}}
                <span>{{item.shopCartQuantity}}人加购</span>
              </div>
              <img src="../../../assets/newImages/gouwuche.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    付款方式-->
<!--    <div class="payWay" v-if="activeIndex === 2">-->
<!--        <p class="tip">付款请扫描二维码</p>-->
<!--        <div class="payList">-->
<!--          <div class="pay" style="border:1px solid rgba(0,158,233,1);color: #009EE9" @click="showCode('alipayCode')">支付宝二维码</div>-->
<!--          <div class="pay" style="border:1px solid rgba(133,218,70,1); color:#85DA46;" @click="showCode('wechatCode')">微信二维码</div>-->
<!--          <div class="pay" style="border:1px solid rgba(221,11,20,1); color:#DD0B14;" @click="showCode('assistantCode')">扫一扫添加客服微信</div>-->
<!--        </div>-->
<!--    </div>-->

    <van-dialog v-model="show"  :show-cancel-button="false" :showConfirmButton="false" closeOnClickOverlay>
      <img :src="codeType" alt="">
      <div class="shareBtn">分享</div>
    </van-dialog>
  </div>
</template>

<script>
  import {findDetailById, findParentStoreWithUserId,findByStoreId, findMemberByUserId} from "../../../services/store";
  import {findByStoreAndSaleStatus} from "../../../services/storeProduct";
  import {get} from "../../../services/user";

  export default {
    data() {
      return {
        codeType:'',
        searchItem:'',
        activeIndex:1,
        navList:['社群联盟','首页','宝贝'],
        chooseList:['综合','销量','新品','价格','筛选'],
        show:false,
        storeInfo:'',
        storeDetail:'',
        storeBanner:'',
        chooseIndex: 0,
        goods:'',
        storeId:'',
        image:[],
        images:[],
        leagueList: [],
        loading: false,
        finished: false,
        page: 0
      }
    },
    computed:{
      id() {
          return this.$store.state.user.id
      }
    },
    methods:{
      showCode(type) {
        this.codeType = this.storeDetail[type]
        this.show = true
      },
      toSearch() {
        this.$router.push('/search')
      },
      viewBabyDetail(id) {
        this.$router.push({
          name: 'babyDetail',
          query: {
            id: id
          }
        })
      },
      // 处理首页宝贝条件选中事件
      handleIndex(i) {
        this.chooseIndex = i;
        if(i !== 4) {
          let sortWordList = ['','sold_quantity','update_at','sale_price']
          this.searchStore(sortWordList[i])
        }
      },
      searchStore(sortWord) {
        let descList = ['id']
        if(sortWord !== '') {
          descList.unshift(sortWord);
        }
        // 获取门店信息
        findParentStoreWithUserId({},res => {
          this.storeId = res.id;
          this.storeInfo = res
          this.storeBanner = res.banner.split(';')
          findDetailById({
            id:res.id
          },result => {
            this.storeDetail = result
          })
          //获取首页轮播图下面的那些图片
          findByStoreId({'storeId':this.storeId},res =>{
            res.map(item=>{
              this.image.push(item.storeImageList);
            })
          })
          // 获取门店宝贝信息
          findByStoreAndSaleStatus({
            pageable:{
              page:1,
              size:10,
              sort:{
                desc: descList
              }
            },
            saleStatus:'上架',
            store:{
              id:res.id
            }
          },goods => {
            this.goods = goods
          })
        })
      },
      searchLeague() {
        this.leagueList = [];
        this.page = 0;
        this.finished = false;
      },
      //获取社群联盟
      searchLeagueAction() {
        this.page += 1;

        let param = {
          "pageable": {
            "page": this.page,
            "size": 10,
            "sort": {
              "desc": [
                "id"
              ]
            }
          }
        }
        findMemberByUserId(param, res => {
          this.leagueList = this.leagueList.length === 0 ? this.leagueList = res : this.leagueList.concat(res);

          this.loading = false;
          if(res.length < 9) {
            this.finished = true;
          }
        })
      }
    },
    created() {
      this.$nextTick(() => {
        const user = JSON.parse(localStorage.getItem('userMsg'))
        if(user && typeof user ==='object' && user.hasOwnProperty('id')) {
          get({
            id:user.id
          },res => {
            this.user = res
          })
        } else {
          this.$toast('您未登录账号')
          this.$router.push('/userLogin')
        }
      })

      // 获取门店信息
      findParentStoreWithUserId({},res => {
        this.storeId = res.id;
        this.storeInfo = res
        this.storeBanner = res.banner.split(';')
        findDetailById({
          id:res.id
        },result => {
          this.storeDetail = result
        })
     //获取首页轮播图下面的那些图片
        findByStoreId({'storeId':this.storeId},res =>{
         res.map(item=>{
           // if(item.storeImageList.length === 3) {
             this.image.push(item.storeImageList);
             // console.log(this.image);
           // } else {
           //   this.images.push(item.storeImageList);
           //   console.log(this.images);
           // }

         })
        })
        // 获取门店宝贝信息
        findByStoreAndSaleStatus({
          pageable:{
            page:1,
            size:10,
            sort:{
              desc:['id']
            }
          },
          saleStatus:'上架',
          store:{
            id:res.id
          }
        },goods => {
          this.goods = goods
        })
      })

      //获取联盟信息
      this.searchLeague();
    }
  }
</script>

<style lang="less" scoped>
  .shopBaby {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .faketop {
      position: relative;
      z-index: 998;
      background-color: #fff;
    }
    .top {
      z-index: 999;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 8.8rem;
      background: #fff;
      .bg {
        width: 200%;
        height: 12.5rem;
        background:linear-gradient(0deg,rgba(237,0,26,1),rgba(183,41,57,1));
        border-radius:50%;
        text-align: center;
        margin-top: -50%;
        margin-left: -50%;
      }
      .search-wrap {
        position: absolute;
        top: 2px;
        width: 100%;
        .van-search {
          width: 88%;
          height: 1.2rem;
          background: transparent;
          .van-search__content {
            height: 1rem;
            background: rgba(238,238,238,0.2)
          }
        }
        .saoyisao {
          position: absolute;
          right: 0.8rem;
          top: 0.2rem;
          width: 0.8rem;
          height: 0.8rem;
          background: url("../../../assets/images/saoyisao.png");
        }
      }
      .shopShow {
        position: absolute;
        top: 1.4rem;
        left: 50%;
        transform: translateX(-50%);
        width: 13.8rem;
        height: 7.08rem;
        background:rgba(255,255,255,1);
        box-shadow:-1px -1px 5px 0px rgba(119,119,119,0.3);
        border-radius:0.6rem;
        overflow: hidden;
        .shopInfo {
          height: 2.08rem;
          width: 100%;
          position: relative;
          overflow: hidden;
          .shopAvatar {
            float: left;
            margin-left: 0.24rem;
            img {
              width: 1.32rem;
              height: 1.32rem;
              border-radius: 50%;
            }
          }
          .shopOtherInfo {
            float: left;
            margin-left: 0.24rem;
            .p1 {
              font-size:0.6rem;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
            }
            .p2 {
              font-size:0.4rem;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
            }
          }
          .share {
            width: 0.76rem;
            height: 0.68rem;
            position: absolute;
            right: 0.4rem;
            /*top: 0.4rem;*/
          }
        }
      }
    }
    .nav {
      background-color: white;
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 1.4rem;
      border-bottom: 1px solid #E6E6E6;
      border-top: 1px solid #E6E6E6;
      padding-top: 0.44rem;
      position: fixed;
      top: 8.8rem;
      left: 0;
      right: 0;
      /*box-sizing: border-box;*/
      .item {
          display: inline-block;
          height: 1rem;
          line-height: 1rem;
          font-size:0.52rem;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
      }
      .active {
        font-size:0.6rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        border-bottom: 2px solid rgba(51,51,51,1);
      }
    }
    .homePage {
      height: calc(100% - 1.84rem - 8.8rem - 50px);
      .otherNav {
        position: fixed;
        left: 0;
        right: 0;
        top: 10.64rem;
        display: flex;
        justify-content: space-around;
        padding: 0.56rem 0 0.24rem;
        background: #FAFAFA;
        .item {
          width: 1.8rem;
          text-align: center;
          img {
            width: 1.16rem;
            height: 0.96rem;
          }
          p {
            font-size:0.44rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            width: 1.96rem;
          }
        }
      }
      .fakeotherNav {
        display: flex;
        justify-content: space-around;
        padding: 0.56rem 0 0.24rem;
        .item {
          width: 1.8rem;
          text-align: center;
          img {
            width: 1.16rem;
            height: 0.96rem;
          }
          p {
            font-size:0.44rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            width: 1.96rem;
          }
        }
      }

    }
    .baby {
      height: calc(100% - 1.84rem - 8.8rem - 50px);
      overflow: scroll;
      .list {
        .choose {
          border-top: solid rgba(230,230,230,1);;
          height: 1.2rem;
          background:rgba(255,255,255,1);
          display: flex;
          justify-content: space-between;
          padding: 0 0.4rem;
          .list {
            text-align: center;
            width: 2.4rem;
            height: 1.2rem;
            font-size:0.52rem;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:1.2rem;
            >span {
              padding: 0 0.4rem;
              border-radius:20px;
              position: relative;
              div {
                position: absolute;
                top: 0.1rem;
                right: -0.22rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 0.52rem;
                height: 0.46rem;
                img {
                  margin-top: 0.04rem;
                  width: 0.26rem;
                  height: 0.23rem;
                }
              }
            }
          }
        }
        .card {
          width: 13.8rem;
          height: 4rem;
          background:rgba(255,255,255,1);
          border-radius:0.4rem;
          margin:0.4rem auto;
          overflow: hidden;
          .showImg {
            width: 5.32rem;
            height: 4rem;
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .otherInfo {
            float: left;
            /*margin-left: 0.52rem;*/
            padding: 0.4rem;
            .title {
              width:7.64rem;
              height:1.8rem;
              font-size:0.6rem;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
            }
            .area {
              height:0.8rem;
              font-size:0.46rem;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
              line-height:0.84rem;
            }
            .price {
              font-family:PingFang SC;
              font-weight:bold;
              font-size: 0.6rem;
              color:rgba(220,22,35,1);
              line-height:0.6rem;
              justify-content: space-between;
              display: flex;
              div {
                span {
                  width:1.72rem;
                  height:0.4rem;
                  margin-left: 0.2rem;
                  font-size:0.4rem;
                  font-family:PingFang SC;
                  font-weight:400;
                  color:rgba(153,153,153,1);
                  line-height:0.84rem;
                }
              }
              img {
                width: 0.8rem;
                height: 0.68rem;
                vertical-align:text-top;
              }

            }
          }
        }
      }
    }
    .league {
      height: calc(100% - 1.84rem - 8.8rem - 50px);
      overflow: scroll;
      .list {
        .choose {
          border-top: solid rgba(230,230,230,1);;
          height: 1.2rem;
          background:rgba(255,255,255,1);
          display: flex;
          justify-content: space-between;
          padding: 0 0.4rem;
          .list {
            text-align: center;
            width: 2.4rem;
            height: 1.2rem;
            font-size:0.52rem;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:1.2rem;
            >span {
              padding: 0 0.4rem;
              border-radius:20px;
              position: relative;
              div {
                position: absolute;
                top: 0.1rem;
                right: -0.22rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 0.52rem;
                height: 0.46rem;
                img {
                  margin-top: 0.04rem;
                  width: 0.26rem;
                  height: 0.23rem;
                }
              }
            }
          }
        }
        .card {
          width: 13.8rem;
          height: 4rem;
          background:rgba(255,255,255,1);
          border-radius:0.4rem;
          margin:0.4rem auto;
          overflow: hidden;
          .showImg {
            width: 5.32rem;
            height: 4rem;
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .otherInfo {
            float: left;
            /*margin-left: 0.52rem;*/
            color: #333333;
            padding: 0.4rem;
            .title {
              margin-bottom: 3px;
              width:7.64rem;
              font-size:0.6rem;
              font-family:PingFang SC;
              line-height:0.84rem;
            }
            .area, .phone {
              height:0.8rem;
              font-size:0.5rem;
              font-family:PingFang SC;
              font-weight:400;
              line-height:0.84rem;
            }
            .price {
              font-family:PingFang SC;
              font-weight:bold;
              font-size: 0.4rem;
              color:#999999;
              line-height:0.6rem;
              justify-content: space-between;
              display: flex;
              div {
                span {
                  width:1.72rem;
                  height:0.4rem;
                  margin-left: 0.2rem;
                  font-size:0.4rem;
                  font-family:PingFang SC;
                  font-weight:400;
                  color:rgba(153,153,153,1);
                  line-height:0.84rem;
                }
              }
              img {
                width: 0.8rem;
                height: 0.68rem;
                vertical-align:text-top;
              }

            }
          }
        }
      }
    }
    .payWay {
      .tip {
        font-size:0.44rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:0.84rem;
        margin-top: 0.4rem;
        margin-left: 0.6rem;
      }
      .payList {
        .pay {
          width: 10rem;
          height: 1.6rem;
          margin:0.8rem auto 0;
          text-align: center;
          font-size:13px;
          font-family:PingFang SC;
          font-weight:500;
          line-height: 1.6rem;
          border-radius: 0.2rem;
        }
      }
    }
    .van-dialog {
      width: 9.72rem;
      /*height: 9.72rem;*/
      background-color: rgba(0,0,0,-0.3);
      img {
        width: 9.72rem;
        height: 9.72rem;
      }
      .shareBtn {
        text-align: center;
        line-height: 1.6rem;
        width:8rem;
        height:1.6rem;
        background:rgba(221,11,20,1);
        border-radius:0.16rem;
        font-size:0.72rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin:1rem auto 0;
      }
    }
  }

  .imgContainer {
    /*height: calc(100% - 2.68rem);*/
    /*!*overflow: scroll;*!*/
  }

  .van-swipe__indicators {
    bottom: 1.2rem;
  }

  .swiper-bottom {
    position: relative;
    p {

      position: absolute;
    }
    img {
      top: 0.14rem;
      position: absolute;
    }
  }
</style>
