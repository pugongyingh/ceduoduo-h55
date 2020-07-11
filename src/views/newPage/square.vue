<template>
  <div class="square">
    <div class="bg">
      <input type="text" class="mySearch" placeholder="2020最美春天评选" @focus="toSearch">
      <van-icon class="searchIcon" color="rgb(244,102,118)" name="search" size="0.52rem" />
      <van-icon name="scan" class="scanIcon" size="0.52rem" />
      <van-icon name="chat-o" color="white" dot class="chatIcon" size="0.82rem" />
    </div>
    <div class="nav">
      <span v-for="(item,index) in list" @click="toggle(index)" :key="index"
            :class="index === activeIndex ? 'active' : ''">{{item}}</span>
    </div>
<!--    热门  -->
    <div class="live" v-if="activeIndex === 0">
      <div class="card" v-for="i in 6">
        <div class="top">
          <div class="avatar">
            <img src="../../assets/images/b_pic_statue.jpg" alt="">
          </div>
          <div class="info">
            <p class="p1">店铺名称AAA</p>
            <p class="p2">广东广州</p>
          </div>
        </div>
        <p style="overflow: hidden">
          <span class="sp1">#2020最美春天</span>
          <span class="sp2">了解详情</span>
        </p>
        <div class="liveImg">
          <img src="../../assets/images/b_pic_statue.jpg" alt="">
          <img src="../../assets/images/b_pic_statue.jpg" alt="">
          <img src="../../assets/images/b_pic_statue.jpg" alt="">
        </div>
        <div class="option">
          <div class="item">
            <img src="../../assets/images/share.png" alt="">10086</div>
          <div class="item">
            <img src="../../assets/images/share.png" alt="">10086</div>
          <div class="item">
            <img src="../../assets/images/share.png" alt="">10086</div>
        </div>
      </div>
    </div>
<!--    大赛  -->
    <div class="game" v-if="activeIndex === 1">
      <van-pull-refresh :head-height="50" v-model="contestRefresh" @refresh="onRefreshContest">
        <van-list
          v-model="contestLoading"
          :finished="contestFinished"
          finished-text="已经到底了~"
          :immediate-check="false"
          :offset="10"
          @load="onLoadContest"
        >
          <div class="card" v-for="(i, index) in contestData" :key='index'>
            <div class="top">
              <div class="avatar">
                <img :src="i.storeCover" alt="">
              </div>
              <div class="info">
                <p class="p1">{{i.storeName}}</p>
                <p class="p2">{{i.storeAddress}}</p>
              </div>
              <div class="entry" v-if='i.phase !== "已结束"' @click="$router.push('/signIn')" >
                <van-icon name="plus"/>
                <span>参赛</span>
              </div>
            </div>
            <div class="center" @click="$router.push({path: '/bigGame/' + i.id})">
              <img :src="i.covers" alt="">
              <div class="c_s">
                <span>{{i.phase}}</span>
              </div>
            </div>
            <div class="bottom">
              <span class="left-dec">{{i.name}}</span>
              <div class='right-num'>
                <img src="../../assets/images/wode.png" alt="">
                <span class="text">{{i.applyQuantity}}</span>
                <img src="../../assets/images/wode.png" alt="">
                <span class="text">{{i.startAt | updateStartAt}}</span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
<!--    直播  -->
    <div class="live" v-if="activeIndex === 2">
      <div class="card" v-for="item in liveList">
        <div class="top">
          <div class="avatar">
            <img :src="item.storeCover" alt="">
          </div>
          <div class="info">
            <p class="p1">{{item.title}}</p>
            <p class="p2">{{item.storeAddress}}</p>
          </div>
          <div class="btn" @click="goLiveDetail(item.liveShowId)">
            进入直播
          </div>
        </div>
        <div class="liveImg">
          <van-image fit='cover' :src="imgSrc" v-for="imgSrc in item.coverList" radius="0.16rem">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </div>
    </div>
<!--    故事  -->
    <div class="story" v-if="activeIndex === 3">
      <div class="list">
        <div class="card" v-for="(item, index) in storyData" :key='index'>
          <img :src="item.caseStoryThumbnail" alt="">
          <p>{{item.caseStoryName}}</p>
          <div class="shop">
            <img :src="item.storeCover" alt="" class="shopImg">
            <span class="shopName">{{item.storeName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {findLiveListBySearch, findLiveDetailById} from '@/services/square.js'
  import { findByStatus } from '@/services/caseStory.js'
  import { findWithStatus } from '@/services/contest.js'
  export default {
    data() {
      return {
        value: '',
        list: ['热门', '大赛', '直播', '故事'],
        activeIndex: 1,
        liveList:[],
        // 比赛
        contestPage: 1,
        // 故事
        storyPage: 1,
        size: 10,
        // 比赛数据
        contestData: [],
        // 故事数据
        storyData: [],
        contestLoading: false,
        contestFinished: false,
        contestRefresh: false
      }
    },
    methods: {
      toggle(index) {
        this.activeIndex = index;
      },
      toSearch() {
        this.$router.push('/search')
      },
      goLiveDetail(id){
        this.$router.push({
          name: 'living',
          params: {id}
        })
      },
      // 获取比赛数据
      findContestData() {
        if (this.contestRefresh) {
          this.contestPage = 1
          this.contestData = []
        }
        findWithStatus({pageable: {page: 1, size: 10, sort: {desc: ["id"]}}}, res => {
          for (let i = 0; i < res.length; i++) {
            this.contestData.push(res[i])
          }
          // 请求成功后隐藏刷新加载
          this.contestRefresh = false;
          // 并且底线要置为false以加载数据
          this.contestFinished = false;
        })
      },
      // 懒加载比赛数据
      onLoadContest() {
        this.contestPage += 1
        findWithStatus({pageable: 
            { 
              page: this.contestPage, 
              size: this.size,
              sort: {desc: ["id"]}
            }
          }, res => {
          for (let i = 0; i < res.length; i++) {
            this.contestData.push(res[i])
          }
          // 加载完毕置为false
          this.contestLoading = false
          if (res.length < 10) {
            this.contestFinished = true
          }
        })
      },
      // 下拉刷新比赛数据
      onRefreshContest() {
        this.findContestData()
      },
      // 获取故事数据
      findStoryData() {
        findByStatus({
          pageable: {page: this.storyPage, size: this.size, sort: {desc: ['id']}}
        }, res => {
          this.storyData = res
        })
      }
      // 获取热门栏目数据

    },
    created() {
      // 获取直播数据
      findLiveListBySearch({
        pageable: {page: this.page, size: this.size, sort: {desc: ['id']}},
        title: ''
      }, res=>{
        this.liveList = res
      })
      // 获取比赛数据
      this.findContestData()
      // 获取故事数据
      this.findStoryData()
      // 获取热门栏目数据
      this.getHotData()
    },
    filters: {
      updateStartAt(val) {
        return val.split(" ")[0]
      }
    }
  }
</script>

<style lang="less" scoped>
  .square {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .bg {
      width: 100%;
      height: 1.76rem;
      background-color: #ed001a;
      text-align: center;
      z-index: 10000;
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .mySearch {
        width: 12rem;
        height: 1rem;
        font-size: 0.4rem;
        padding-left: 1rem;
        box-sizing: border-box;
        border-radius: 0.4rem;
        margin-left: 0.32rem;
        border: none;
      }
      .searchIcon {
        left: -12rem;
        top: 0.07rem;
      }
      .scanIcon {
        right: 2.2rem;
        top: 0.07rem;
      }
      .chatIcon {
        top: -1.04rem;
        right: -6.08rem;
      }
    }
    /*小红点颜色*/
    .van-info--dot {
      background-color: rgb(211,141,18);
    }
    .nav {
      width: 100%;
      position: fixed;
      height: 1.2rem;
      margin-top: 1.76rem;
      background-color: white;
      font-size: 0.52rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      z-index: 10000;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      line-height: 1.2rem;
      margin-bottom: 0.4rem;


      span {
        display: inline-block;
      }
    }

    .active {
      font-size: 0.6rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(237, 0, 26, 1);
      border-bottom: 2px solid rgba(237, 0, 26, 1);
    }

    .hot {
      .card {
        width: 13.8rem;
        height: 5rem;
        background-color: white;
        border-radius: 15px;
        margin: 0.4rem auto 0;

        .Img {
          float: left;
          width: 7rem;
          height: 5rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 15px 8px 8px 15px;
          }
        }

        .other {
          float: left;
          margin-left: 0.48rem;

          .title {
            font-size: 0.52rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.6rem;
          }

          .content {
            img {
              width: 0.52rem;
              height: 0.52rem;
            }

            span {
              font-size: 0.52rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(119, 119, 119, 1);
              position: relative;
              top: -1px;
            }
          }

          .btn {
            width: 4.04rem;
            height: 0.96rem;
            background: rgba(221, 11, 20, 1);
            border-radius: 0.16rem;
            font-size: 0.52rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 0.96rem;
            text-align: center;
            margin-left: 0.32rem;
          }
        }
      }
    }

    .game {
      margin-bottom: 1.96rem;
      padding-top: 3.2rem;
      .card {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        padding-bottom: 0.62rem;
        .top {
          width: 100%;
          height: 2.24rem;
          overflow: hidden;
          .avatar {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 50%;
            margin-top: 0.44rem;
            margin-left: 0.64rem;
            float: left;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .info {
            float: left;
            margin-top: 0.48rem;
            margin-left: 0.28rem;
            .p1 {
              font-size: 0.52rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              width: 8rem;
            }
            .p2 {
              font-size: 0.4rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(119, 119, 119, 1);
              margin-top: 2px;
              width: 8rem;
            }
          }
          .entry {
            display: flex;
            align-items: center;
            height: 2.24rem;
            line-height: 2.24rem;
            margin-right: 0.68rem;
            float: right;
            font-size: 0.6rem;
            font-weight: 500;
            color: rgba(237, 0, 26, 1);
          }
        }
        .center {
          margin-top: 0.48rem;
          padding-bottom: 0.46rem;
          text-align: center;
          position: relative;
          display: flex;
          justify-content: center;
          img {
            width: 10rem;
            height: 14rem;
            border-radius: .125rem;
            box-shadow: .0125rem 0 0.4rem 0.1rem rgba(0, 0, 0, .2);
          }
          .c_s {
            span {
              position: absolute;
              right: 0;
              top: 0;
              width: 1.70rem;
              height: 1rem;
              background: rgba(243, 152, 0, 1);
              border-radius: 4px 0px 0px 4px;
              font-size: 0.44rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 1rem;
              text-align: center;
              padding: .25rem;
            }

          }
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left-dec {
            font-size: 0.56rem;
            font-family: PingFang-SC-Medium;
            font-weight: bolder;
            color: rgba(51, 51, 51, 1);
            margin-left: 0.84rem;
          }
          .right-num {
            height: 100%;
            display: flex;
            align-items: center;
            height: 0.84rem;
            margin-right: 0.76rem;
            img {
              width: 0.52rem;
              height: 0.56rem;
              margin: 0 0.34rem;
            }
            .text {
              font-size: 0.48rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(119, 119, 119, 1);
            }
          }
        }
      }
    }
    .live {
      margin-bottom: 1.96rem;
      padding-top: 3rem;
      .card {
        background-color: white;
        padding: 0.6rem;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(230,230,230,1);
        .top {
          width: 100%;
          overflow: hidden;
          .avatar {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 50%;
            margin-top: 0.44rem;
            float: left;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .info {
            float: left;
            margin-top: 0.36rem;
            margin-left: 0.36rem;

            .p1 {
              font-size: 0.52rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              width: 8rem;
            }

            .p2 {
              font-size: 0.4rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(119, 119, 119, 1);
              margin-top: 2px;
              width: 8rem;
            }
          }

          .btn {
              float: right;
              margin-top: 0.48rem;
              width: 3.2rem;
              height: 1rem;
              line-height: 1rem;
              display: inline-block;
              border-radius: 0.16rem;
              background:rgba(255,255,255,1);
              border:1px solid rgba(237,0,26,1);
              color: rgba(237,0,26,1);
              font-size: 0.52rem;
              font-family: PingFang SC;
              font-weight: 500;
              text-align: center;
            }
        }

        .sp1 {
          font-size: 0.52rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(237, 0, 26, 1);
          float: left;
        }

        .sp2 {
          font-size: 0.4rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(119, 119, 119, 1);
          float: right;
        }

        .liveImg {
          display: flex;
          justify-content: space-between;
          margin-top: 0.36rem;
          .van-image {
            flex: 0 0 33.33%;
            width: 33.33%;
            height: 4.4rem;
          }
          img {
            flex: 0 0 33.33%;
            width: 33.33%;
            height: 4.4rem;
          }
        }

        .option {
          display: flex;
          justify-content: space-around;
          margin-top: 0.36rem;
          .item {
            text-align: center;
            width: 4.24rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size:0.4rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(119,119,119,1);
            img {
              width: 0.64rem;
              height: 0.6rem;
              vertical-align: text-bottom;
            }
          }
        }
      }
    }
    .story {
      margin-bottom: 1.96rem;
      padding-top: 3rem;
      .list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0.2rem;
        .card {
          width: 7.08rem;
          background-color: white;
          border-radius:4px 4px 0px 0px;
          margin-top: 0.4rem;
          img {
            width: 7.08rem;
            height: 9rem;
          }
          p {
            text-align: center;
            font-size:0.56rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.84rem;
          }
          .shop {
            .shopImg {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 0.44rem;
            }
            .shopName {
              font-size:0.4rem;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(51,51,51,1);
              position: relative;
              top: -3px;
            }
          }
        }
      }
    }
  }
</style>
