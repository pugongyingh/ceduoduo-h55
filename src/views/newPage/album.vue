<template>
  <div class="album">
    <div class="top">
      <img src="../../assets/images/saoyisao.png" alt="" class="saoyisao">
      <div class="nav"><span v-for="(item,index) in navList" :key="index"
                             :class="[activeIndex === index ? 'active' : '']"
                             @click="activeIndex = index">{{item}}</span></div>
      <img src="../../assets/images/sousuo.png" alt="" class="search">
    </div>
<!--    电子相册-->
    <div class="albumClass" v-if="activeIndex===0">
      <van-search v-model="value" placeholder="记录每个人的故事" @focus="viewSearch"/>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
<!--      模板分类-->
      <div class="templateCategroy">
        <div style="overflow: hidden;position:relative;">
          <span class="title">模板分类</span>
          <img src="../../assets/images/shop-more.png" alt="" class="more-icon">
          <span class="more" @click="$router.push('/tempCategory')">更多</span>
        </div>
        <div class="templateList">
          <div class="item" v-for="item in tempList" :key="item.id" @click="viewCategory(item)">
            <img :src="item.icon" alt="">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
<!--     下面的那些不同分类的模板 -->
      <div class="templateCategroy" v-for="item in hotList" :key="item.templateCategoryId">
        <div style="overflow: hidden;position:relative;">
          <span class="title">{{item.templateCategoryName}}</span>
          <img src="../../assets/images/shop-more.png" alt="" class="more-icon">
          <span class="more" @click="viewCategory({id: item.templateCategoryId, name: item.templateCategoryName})">更多</span>
        </div>
        <div class="albumList">
          <div class="item" v-for="i in item.templateList" :key="i.templateId" @click="viewTemp(i.templateId)">
            <img :src="i.templateCover" alt="">
            <p>{{i.templateName}}</p>
          </div>
        </div>
      </div>
    </div>


<!--影像制品-->
    <div class="videoClass" v-if="activeIndex===1">
      <van-search v-model="value" placeholder="记录每个人的故事"/>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/images/ceshi.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/images/bg.jpg" alt="">
        </van-swipe-item>
      </van-swipe>
<!--      方相册选择-->
      <div class="albumNav">
        <div class="item" v-for="item in sortList" @click="toAlbumDetail1(item.id)">
          <img :src="item.icon" alt="">
          <p>{{item.name}}</p>
        </div>
        <div class="item" @click="" @click="toAlbumMore">
          <img src="../../assets/images/xiangce-more.png" alt="">
          <p>更多</p>
        </div>
      </div>
<!--      限时秒杀-->
      <div class="seckill" v-for="itemType in productSortList">
        <p class="title">{{itemType.type}}</p>
        <div class="shopList">
          <div class="item" @click="toAlbumDetail2(item.id)" v-for="item in itemType.platformProductGoodsDTO">
            <div class="imgBox">
              <img :src="item.covers" alt="">
            </div>
            <p>
              <span class="sp1">￥{{item.salePrice}}</span>
              <span class="sp2">￥{{item.originalPrice}}</span>
            </p>
          </div>
        </div>
      </div>
<!--&lt;!&ndash;      热门活动&ndash;&gt;-->
<!--      <div class="hotActive">-->
<!--        <p class="title">热门活动</p>-->
<!--        <div class="shopList">-->
<!--          <div class="item" v-for="i in 2">-->
<!--            <div class="content">-->
<!--              <p class="name">大牌折扣</p>-->
<!--              <p class="desc">红色相册</p>-->
<!--            </div>-->
<!--            <div class="shopImg">-->
<!--              <img src="../../assets/images/ceshi.jpg" alt="">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      方相册专区-->
      <div class="prefecture">
        <p class="title">方相册专区</p>
        <div class="bg">
          <img src="../../assets/images/bg.jpg" alt="">
        </div>
        <div class="shopList">
          <div class="item" v-for="i in 4">
            <img src="../../assets/images/ceshi.jpg" alt="">
            <p class="title">皮质方相册粉</p>
            <p class="price">￥128</p>
          </div>
        </div>
      </div>
<!--      方相册展示-->
      <div class="bigShopList mgt20">
        <div class="bigList pdt20" v-for="item in 4">
          <img src="../../assets/images/ceshi.jpg" alt="">
          <p>皮质方相册粉</p>
          <div>
            <span class="price">￥128</span>
            <span class="paid">2人付款</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {search,findHomePageNew} from '@/services/templateCategory'
  import {findIconAndId} from '@/services/platformProduct'
  import {findHotCategoryTemplate} from '@/services/template'
  import {get} from '@/services/platformProduct'
  import {getStoreProduct} from '@/services/storeProduct'
  import {findByAdvertisementLocation} from '@/services/article'

  export default {
    data() {
      return {
        activeIndex: 0,
        navList: ['电子相册', '影像制品'],
        value:'',
        tempList: [],
        hotList: [],
        sortList:[],
        productSortList:[],
        bannerList: []
      }
    },
    methods: {
      searchTemp() {
        let tempParam = {
          "templateCategory": {
            "status": "启用"
          },
          "pageable": {
            "page": 1,
            "size": 10,
            "sort": {
              "asc": [],
              "desc": ["orderNumber", "id"]
            }
          }
        };
        search(tempParam, res => {
          this.tempList = res.slice(0, 4);
        })
        let hotParam = {
          "pageable": {
            "page": 1,
            "size": 10,
            "sort": {
              "desc": [
                "id"
              ]
            }
          }
        };
        findHotCategoryTemplate(hotParam, res => {
          this.hotList = res;
        })
      },
      //查看模板分类
      viewCategory(item) {
        this.$router.push({
          name: 'chooseTemplate',
          query: {
            categoryId: item.id,
            categoryName: item.name
          }
        })
      },
      //跳模板详情(唤醒app)
      viewTemp(tempId) {
        this.$router.push({
          name: 'tempDetail',
          query: {
            tempId: tempId
          }
        })
      },
      //打开搜索界面
      viewSearch() {
        this.$router.push('/albumTempSearch')
      },
      toAlbumDetail1(id){
        getStoreProduct({id},res=>{
          this.$router.push({
            name: 'albumDetail',
            params: {
              good:res,
              picList:res.covers.split(";")
            }
          })
        })
      },
      toAlbumDetail2(id){
        get({id},res=>{
          this.$router.push({
            name: 'albumDetail',
            params: {
              good:res,
              picList:res.covers.split(";")
            }
          })
        })
      },
      toAlbumMore(){
        this.$router.push({
          name: "albumMore",
          params: {moreList:this.moreList}
        })
      }
    },
    mounted() {
      let that = this
      this.searchTemp()
      findIconAndId({},function (res) {
        that.sortList = res
      })
      findHomePageNew({},res=> {
        that.productSortList = res.platformProductAttributeDTOList
        that.moreList = res.category
      })

      //拿到电子相册的轮播图
      findByAdvertisementLocation({ advertisementLocation: "首页banner图" }, res => {
        this.bannerList = res.map(item => {
          return item.advertisementImage;
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  .album {
    width: 100%;
    /* height: 100vh; */
    margin-bottom: 1.5rem;
    background-color: #FAFAFA;
    .albumClass {
      /*height: 1000px;*/
      margin-bottom: 50px;
    }
    .videoClass {
      height: 1500px;
    }
    .top {
      width: 15rem;
      height: 2rem;
      /*background-color: #5ac55a;*/
      position: relative;

      .nav {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        span {
          font-size: 0.56rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(119, 119, 119, 1);
          margin-right: 0.7rem;
        }

        .active {
          font-size: 0.72rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }

      .saoyisao {
        position: absolute;
        left: 0.68rem;
        top: 58%;
        transform: translateY(-50%);
      }

      .search {
        position: absolute;
        right: 0.68rem;
        top: 58%;
        transform: translateY(-50%);
      }
    }

    .bg {
      width: 100%;
      height: 4rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .templateCategroy {
      padding: 0 0.6rem;
      background-color: white;
      margin-bottom: 0.4rem;

      .title {
        font-size: 0.52rem;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }

      .more {
        font-size: 0.4rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        position: absolute;
        top: 68%;
        right: 0.4rem;
        transform: translateY(-50%);
      }

      .more-icon {
        width: 0.2rem;
        height: 0.4rem;
        position: absolute;
        top: 68%;
        right: 0;
        transform: translateY(-50%);
      }

      .templateList {
        display: flex;
        margin-top: 0.88rem;
        padding-bottom: 0.36rem;
        width: 100%;

        .item {
          flex: 0 0 25%;
          width: 25%;
          text-align: center;

          img {
            width: 100%;
          }

          p {
            font-size: 0.3rem;
            font-family: PingFangSC;
            font-weight: 100;
            color: rgba(0, 0, 0, 1);
            text-align: center;
          }
        }
      }

      .albumList {
        display: flex;
        width: 100%;
        padding-bottom: 0.4rem;

        .item {
          flex: 0 0 33.33%;
          width: 33.33%;
          text-align: center;
          margin-top: 0.4rem;

          img {
            width: 3.4rem;
            height: 4.56rem;
          }

          p {
            font-size: 0.44rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            text-align: center;
          }
        }
      }
    }

    .van-swipe {
      width: 100%;
      height: 6rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .albumNav {
      width: 100%;
      height: 3.2rem;
      background-color: white;
      display: flex;
      justify-content: space-around;
      padding-top: 0.4rem;
      padding-bottom: 0.48rem;
      box-sizing: border-box;

      .item {
        width: 3rem;
        text-align: center;

        img {
          width: 1.48rem;
          height: 1.48rem;
          border-radius: 50%;
        }

        p {
          text-align: center;
          font-size: 0.44rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
    }

    .seckill {
      padding-top: 0.52rem;
      background-color: white;
      padding-bottom: 0.4rem;
      margin-bottom: 0.4rem;
      margin-top: 0.4rem;
      .title {
        font-size:0.64rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-top: 0.52rem;
        margin-left: 0.64rem;
      }
      .shopList {
        display: flex;
        justify-content: space-around;
        .item {
          width: 3.6rem;
          .imgBox {
            width: 3.6rem;
            height: 3.6rem;
            padding: 10px 10px 10px 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            line-height: 0.64rem;
            overflow: hidden;
            display: flex;
            justify-content: left;
            .sp1 {
              font-size:0.6rem;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(220,25,35,1);
              margin-right: 0.56rem;
            }
            .sp2 {
              font-size:0.4rem;
              font-family:PingFang SC;
              font-weight:400;
              text-decoration:line-through;
              color:rgba(119,119,119,1);
            }
          }
        }
      }
    }

    .hotActive {
      /*padding-top: 0.52rem;*/
      background-color: white;
      padding-bottom: 0.4rem;
      /*box-sizing: border-box;*/
      overflow: hidden;
      margin-bottom: 0.4rem;
      .title {
        font-size:0.64rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-top: 0.52rem;
        margin-left: 0.64rem;
      }
      .shopList {
        display: flex;
        justify-content: space-around;
        .item {
          overflow: hidden;
          height: 3.6rem;
          margin-top: 0.52rem;
          .content {
            float: left;
            margin-right: 0.4rem;
            .name {
              font-size:0.56rem;
              font-family:PingFangSC;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:0.84rem;
              margin-top: 1.08rem;
            }
            .desc {
              font-size:0.44rem;
              font-family:PingFangSC;
              font-weight:400;
              color:rgba(220,25,35,1);
              margin-top: 0.22rem;
            }
          }
          .shopImg {
            float: left;
            width: 3.6rem;
            height: 3.6rem;
            img {
              width: 100%;
              height:100%;
            }
          }
        }
      }
    }
    .prefecture {
      /*padding-top: 0.52rem;*/
      background-color: white;
      padding-bottom: 0.4rem;
      /*box-sizing: border-box;*/
      overflow: hidden;
      .title {
        font-size:0.64rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-top: 0.52rem;
        margin-left: 0.64rem;
      }
      .bg {
        width: 15rem;
        height: 5.2rem;
        margin-top: 0.48rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .shopList {
        display: flex;
        justify-content: space-around;
        margin-top: 0.6rem;
        .item {
          text-align: center;
          img {
            width: 2.4rem;
            height: 2.4rem;
          }
          .title {
            font-size:0.44rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.84rem;
            margin: 0;
            text-align: center;
          }
          .price {
            font-size:0.4rem;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(200,22,35,1);
            line-height:0.84rem;
            text-align: center;
          }
        }
      }
    }
    .bigShopList {
      background-color: white;
      .bigList {
        width: 50%;
        height: 8.6rem;
        text-align: center;
        display: inline-block;
        img {
          width: 6.18rem;
          height: 6.18rem;
        }
        p {
          text-align: left;
          padding: 0 0.5rem;
          font-size:0.6rem;
          font-family:PingFang;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:0.84rem;
        }
        div {
          padding: 0 0.5rem;
          display: flex;
          justify-content: space-between;
          .price {
            display: inline-block;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:400;
            color:rgba(200,22,35,1);
            line-height:0.84rem;
          }
          .paid{
            display: inline-block;
            font-size:0.44rem;
            font-family:PingFang;
            font-weight:400;
            color:rgba(129,129,129,1);
            line-height:0.84rem;
          }
        }
      }
    }
  }
</style>
