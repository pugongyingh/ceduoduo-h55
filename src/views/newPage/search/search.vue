<template>
  <div class="searchResult">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" @click="goBack">
      <van-search v-model="template.name" placeholder="搜索想要的商品" shape="round" @search="getResult"/>
    </div>
    <van-tabs v-if="isSearched" v-model="active">
      <van-tab title="模板">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已经到底了~"
          @load="searchAction"
        >
          <div class="temp-wrap">
            <div class="temp-item" v-for="item in tempResult" :key="item.id" @click="viewTemplate(item.id)">
              <div class="temp-img"><img :src="item.cover ? item.cover : undefined" alt=""></div>
              <div class="temp-title">{{item.name}}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="店铺">
        <div class="shopShow" v-for="i in storeResult">
          <img :src="i.storeProductThumbnailList[0]" alt="" class="" style="width: 100%;height: 5rem">
          <div class="shopInfo">
            <div class="shopAvatar">
              <img :src="i.storeProductThumbnailList[1]" alt="">
            </div>
            <div class="shopOtherInfo">
              <p class="p1">{{i.storeName}}</p>
              <p class="p2">{{i.storeName}}</p>
            </div>
            <div class="enterShop">
              进店
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div v-if="!isSearched" class="searchRecords">
      <p class="hotSearch">
        热门搜索
      </p>
      <div class="hotSearchList">
        <div class="item" v-for="i in hotSearch">
          {{i.topSearchWord}}
        </div>
      </div>

      <p class="hotSearch" style="margin-top: 2rem;position:relative;">
        历史搜索
        <img src="../../../assets/images/b1_ic_del.png" alt="" class="delete" @click="toDelete">
      </p>

      <div class="hotSearchList">
        <div class="item" v-for="i in historySearch">
          {{i}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {search} from "../../../services/article";
  import {searchTemplate} from "../../../services/template";
  import {findByKeyWord} from "../../../services/store";

  export default {
    data() {
      return {
        value: '',
        active: 1,
        isSearched:false,
        hotSearch:[],
        historySearch:[],
        tempResult:'',
        storeResult:'',
        pageable:{
          page:1,
          size:9,
          sort:{
            desc:['id']
          }
        },
        template:{
          name:'',
          status:'已启用'
        },
        //懒加载
        loading: false,
        finished: false,
        hasSearch: false,
        page: 0
      }
    },
    watch: {
      active(val) {
        console.log(val)
        this.searchAction();
      }
    },
    methods: {
      toDelete() {
        localStorage.removeItem('history');
        this.historySearch = [];
      },
      goBack() {
        if(this.isSearched) {
          this.isSearched = false
        } else {
          this.$router.go(-1)
        }
      },
      onSubmit() {
      },
      searchAction() {        //发起搜索请求
        if(this.active === 0) {
          this.page += 1;
          let param =  {
            "template": {
              "name": this.template.name
            },
            "pageable": {
              "page": this.page,
              "size": 9,
              "sort": {
                "desc": [
                  "id"
                ]
              }
            }
          };
          searchTemplate(param, res => {
            this.tempResult = this.tempResult.length === 0 ? this.tempResult = res : this.tempResult.concat(res);

            this.loading = false;
            if(res.length < 9) {
              this.finished = true;
            }
          })
        } else {
          findByKeyWord({
            pageable:this.pageable,
            keyWord:this.template.name
          },res => {
            this.storeResult = res
          })
        }
      },
      getResult() {
        this.tempResult = [];
        this.page = 0;
        this.finished = false;
        this.isSearched = true;
        if(this.historySearch.length < 10) {
          this.historySearch.push(this.template.name)
        } else {
          this.historySearch.shift();
          this.historySearch.push(this.template.name);
        }
        localStorage.setItem('history',JSON.stringify(this.historySearch));
        this.searchAction();
      },
      viewTemplate(tempId) {
        this.$router.push({
          name: 'tempDetail',
          query: {
            tempId: tempId
          }
        })
      }
    },
    beforeDestroy() {

    },
    created() {
      this.historySearch = JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [];
      search({
        article:{
          category:'热门搜索'
        },
        pageable:{
          page:1,
          size:10,
          sort:{
            desc:['id']
          }
        }
      },res => {
        this.hotSearch = res
      })

      // search({
      //   article:{
      //     category:'历史搜索'
      //   },
      //   pageable:{
      //     page:1,
      //     size:10,
      //     sort:{
      //       desc:['id']
      //     }
      //   }
      // },res => {
      //   this.historySearch = res
      // })
    }
  }
</script>

<style lang="less" scoped>
  .searchResult {
    width: 100%;
    height: 100vh;
    /*background-color: #FAFAFA;*/

    .top {
      width: 15rem;
      background-color: white;
      position: relative;
      border-bottom: 1px solid rgba(255, 255, 255, 1);

      img {
        width: 0.4rem;
        height: 0.68rem;
        position: absolute;
        left: 0.6rem;
        top: 50%;
        transform: translateY(-50%);
      }

      .van-search {
        width: 12.16rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .temp-wrap {
      text-align: center;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .temp-item {
        flex: 0 0 33.33%;
        margin: 0.3rem 0 0.3rem;
        width: 33.33%;
        .temp-img {
          img {
            width: 4.2rem;
            height: 5.36rem;
            object-fit: contain;
          }
        }
        .temp-title {
          text-align: center;
          font-size:0.52rem;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
    }

    .templateList {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      .item {
        flex: 0 0 33.33%;
        width: 33.33%;
        margin-top: 0.4rem;

        img {
          width: 4.2rem;
          height: 5.6rem;
          border-radius: 0.2rem;
          text-align: center;
        }

        p {
          font-size: 0.52rem;
          font-family: PingFang SC;
          /*font-weight:bold;*/
          color: rgba(51, 51, 51, 1);
          line-height: 1.2rem;
          text-align: center;
        }
      }
    }

    .shopShow {
      overflow: hidden;
      width: 13.8rem;
      height: 7.08rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: -1px -1px 5px 0px rgba(119, 119, 119, 0.3);
      border-radius: 0.6rem;
      margin: 0.4rem auto;

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
            font-size: 0.6rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 0.84rem;
          }

          .p2 {
            font-size: 0.4rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 0.84rem;
          }
        }

        .enterShop {
          width: 3.2rem;
          height: 1.2rem;
          background: rgba(221, 11, 20, 1);
          border-radius: 0.16rem;
          position: absolute;
          right: 0.88rem;
          top: 10%;
          text-align: center;
          line-height: 1.2rem;
          font-size: 0.6rem;
          font-family: PingFang SC;
          /*font-weight:bold;*/
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .searchRecords {
      padding: 1rem 0.6rem;
      box-sizing: border-box;
      border-top: 1px solid lightgray;

      .hotSearch {
        font-size: 0.6rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(35, 35, 35, 1);
        line-height: 0.76rem;
      }

      .hotSearchList {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 3.2rem;
          height: 1.4rem;
          background: rgba(247, 248, 248, 1);
          border-radius: 0.72rem;
          font-size: 0.56rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(68, 68, 68, 1);
          text-align: center;
          line-height: 1.4rem;
          margin-right: 0.2rem;
          margin-top: 0.6rem;
        }
      }

      .delete {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.72rem;
        height: 0.72rem;
      }
    }
  }
</style>
