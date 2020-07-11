<template>
    <div class="game">
<!--      标头-->
      <div class="navbar">
        <van-nav-bar
          :title="contestDetailData.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>
<!--      页面主体-->
      <div class="gameBody">
        <div class="gameBanner">
          <img :src="contestDetailData.introImage" alt="">
        </div>
<!--        三列-->
        <div class="middle">
          <div class="first">
            <img src="../../../assets/newImages/baoming.png" alt="">
            <span v-if='contestDetailData.phase === "已结束"' @click="$router.push('/getReward/' + contestId)">获奖名单</span>
            <span v-else @click="$router.push({path: '/signIn', query: {storeId, contestId}})">报名参赛</span>
          </div>
          <div class="first" @click="$router.push('/gameDetail/' + contestId)">
            <img src="../../../assets/newImages/saishi.png" alt="">
            <span>赛事详情</span>
          </div>
          <div class="first" @click="$router.push('/rankList/' + contestId)">
            <img src="../../../assets/newImages/paihangbang.png" alt="">
            <span>排行榜</span>
          </div>
        </div>
<!--        比赛倒计时-->
        <div class="count" v-if='contestDetailData.phase !== "已结束"'>
          <div class="title">
            <p></p>
            <div class="text">比赛倒计时</div>
            <div class="time">
              <span>{{day}}<sub>天</sub></span>
              <span>:</span>
              <span>{{hour &gt;= 10 ? hour : '0' + hour}}</span>
              <span>:</span>
              <span>{{minute &gt;= 10 ? minute : '0' + minute}}</span>
              <span>:</span>
              <span>{{second &gt;= 10 ? second : '0' + second}}</span>
            </div>
            <div class="text">后结束</div>
            <p></p>
          </div>
          <div class="choose" @click='handleChoose'>
            <van-field
              v-model="showarea"
              label="选择店铺"
              right-icon="arrow"
              placeholder="请选择"
              input-align="right"
              :readonly="true"
              @focus="handleChoose"
            />
          </div>
          <div class="hadChoosen">
            <div class="list">
              <div class="top">
                <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
                  <van-swipe-item v-for='(item, index) in storeBanner' :key='index'>
                    <img :src="item" alt="">
                  </van-swipe-item>
                </van-swipe>
              </div>
              <div class="bottom">
                <div class="left">
                  <img :src="defaultStore.cover" alt="">
                </div>
                <div class="middle2">
                  <div class="title">{{defaultStore.name}}</div>
                  <div class="brand">社群：{{defaultStore.allianceName}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 比赛已结束 -->
        <div class="count" v-else>
          <div class="title">
            <p></p>
            <div class="text">比赛已结束</div>
            <p></p>
          </div>
          <div class="choose" @click='handleChoose'>
            <van-field
              v-model="showarea"
              label="选择店铺"
              right-icon="arrow"
              placeholder="请选择"
              input-align="right"
              :readonly="true"
              @focus="handleChoose"
            />
          </div>
          <div class="hadChoosen">
            <div class="list">
              <div class="top">
                <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
                  <van-swipe-item v-for='(item, index) in storeBanner' :key='index'>
                    <img :src="item" alt="">
                  </van-swipe-item>
                </van-swipe>
              </div>
              <div class="bottom">
                <div class="left">
                  <img :src="defaultStore.cover" alt="">
                </div>
                <div class="middle2">
                  <div class="title">{{defaultStore.name}}</div>
                  <div class="brand">社群：{{defaultStore.allianceName}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 参赛作品搜索框 -->
        <form action="/">
          <van-search
            v-model="value"
            clearable
            @clear="getAlbum(contestId)"
            shape="round"
            :left-icon="require('../../../assets/images/搜索.png')"
            placeholder="请输入选手编号或昵称"
            @search="onSearch"
          />
        </form>
        <!-- 参赛作品列表 -->
        <div class="useList" v-for="(item,index) in albumData" :key='index' v-if='albumData.length > 0'>
          <img :src="item.albumCover" alt="">
          <div class="right">
            <div class="topUser">
              <img :src="item.userAvatar" alt="">
              <div class="t_right">
                <span>编号：{{item.contestAlbumId}}</span>
                <span>{{item.userName}}</span>
              </div>
            </div>
            <div class="vote">
              <span>票数：{{item.voteQuatity}}票</span>
              <div class="voteBtn" @click='handleVote(item.contestAlbumId)'>投票</div>
            </div>
          </div>
        </div>
        <van-empty description="暂无相关数据" image="search" v-if='albumData.length === 0'/>
      </div>
    </div>
</template>

<script>
  import { getById } from '@/services/contest.js'
  import { findByContestIdAndStoreId } from '@/services/contestAlbum.js'
  import { findParentStoreWithUserId, findDetailById } from '@/services/store.js'
  import { saveByContestAlbumIdWithUserId } from '@/services/votesCache.js'
  export default {
    name: "bigGame",
    data() {
      return {
        chooseArea: false,
        showarea: '请选择',
        // 根据编号或者选手昵称搜索文本
        value: '',
        // 赛事id
        contestId: null,
        // 店铺id
        storeId: null,
        contestDetailData: {},
        albumData: [],
        // 比赛结束时间(Long)
        endAt: '',
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        // 默认关联店铺数据
        defaultStore: {},
        // 默认关联店铺banner图
        storeBanner: [],
        interval: null
      }
    },
    methods: {
      handleChoose() {
        this.$router.push({path: '/chooseMall', query: {contestId: this.contestId}})
      },
      // 根据广场大赛的id获取比赛详情
      getById(id) {
        getById({id}, res => {
          // 获取比赛结束时间
          this.endAt = res.endAt
          this.contestDetailData = res
        })
      },
      onSearch() {
        findByContestIdAndStoreId({
          contestId: this.contestId, 
          keyWord: this.value,
          storeId: this.storeId
          }, res => {
          this.albumData = res
        })
      },
      // 获取默认关联店铺数据
      getDefaultStore() {
        findParentStoreWithUserId({}, res => {
          this.defaultStore = res
          this.showarea = res.name
          this.storeBanner = res.banner.split(';')
          // 店铺id
          this.storeId = res.id
          // 获取参赛作品
          this.getAlbum(this.contestId)
        })
      },
      // 获取参赛作品
      getAlbum(contestId) {
        findByContestIdAndStoreId({contestId, storeId: this.storeId}, res => {
          this.albumData = res
        })
      },
      // 获取时间各个变量
      getTime() {
        if (this.contestDetailData.phase === "已结束") {
          clearInterval(this.interval)
        }
        let now = new Date(Date.now()).getTime()
        // 时间差值(剩余时间)
        let surplusTime = new Date(this.endAt).getTime() - now
        this.day = Math.floor(surplusTime/1000/60/60/24);
        this.hour = Math.floor(surplusTime/1000/60/60%24);
        this.minute = Math.floor(surplusTime/1000/60%60);
        this.second = Math.floor(surplusTime/1000%60);
      },
      // 根据切换后的storeId获取详情数据
      changeStore(storeId) {
        findDetailById({id: storeId}, res => {
          this.defaultStore = res
          this.storeBanner = res.banner.split(';')
          this.showarea = res.name
          // 店铺id
          this.storeId = res.id
          // 获取参赛作品
          this.getAlbum(this.contestId)
        })
      },
      // 投票
      handleVote(id) {
        saveByContestAlbumIdWithUserId({contestAlbumId: id}, res => {
          this.$toast('投票成功')
          // 刷新数据
          this.getAlbum(this.contestId)
        })
      }
    },
    created() {
      // 定时器
      this.interval = setInterval(() => {
        this.getTime()
      }, 1000)

      // 获取默认关联店铺数据
      if (!this.$route.query.storeId) {
        this.getDefaultStore()
      } else {
        // 携带query则说明切换了店铺
        this.changeStore(this.$route.query.storeId)
      }
      
      // 赛事id
      this.contestId = this.$route.params.id
      // 根据广场大赛的id获取比赛详情
      this.getById(this.contestId)
    }
  }
</script>

<style lang="less" scoped>
  .game {
    .navbar {
      border-bottom: 1px solid rgba(204, 204, 204, .2);
    }
    .gameBody {
      background:FCFAFA;
      padding: 0.6rem 0;
      .gameBanner {
        text-align: center;
        padding: 0 0.6rem;
        img {
          width: 100%;
          height: 7.2rem;
          border-radius: 0.4rem;
          box-shadow: 0.0125rem 0 0.4rem 0.1rem rgba(0, 0, 0, 0.2)
        }
      }
      .middle {
        display: flex;
        justify-content: space-around;
        margin: 0.6rem 0.6rem 0 0.6rem;
        height:2.26rem;
        background:rgba(255,255,255,1);
        box-shadow: 3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius: 0.4rem;
        .first {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 1.17rem;
            height: auto;
          }
          span {
            width:2.28rem;
            height:0.54rem;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.82rem;
            margin-left: 0.2rem;
          }
        }
      }
      .count {
        background:rgba(255,255,255,1);
        box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:21px;
        margin: 0.6rem 0.6rem 0 0.6rem;
        .van-cell {
          border-radius:21px;
        }
        .title {
          display: flex;
          height: 1.8rem;
          justify-content: center;
          align-items: center;
          p {
            width: 0.44rem;
            height: 0.08rem;
            margin: 0 0.2rem;
            background:rgba(237,0,26,1);
            display: inline-block;
          }
          .text {
            display: inline-block;
            height:0.82rem;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:bold;
            letter-spacing: 2px;
            color:rgba(51,51,51,1);
          }
          .time {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              &:first-child {
                width: 1rem;
              }
              display: flex;
              align-items: center;
              justify-content: center;
              padding: .0625rem;
              margin: 0 0.12rem;
              text-align: center;
              width: 0.9rem;
              height: 0.9rem;
              background-color:rgba(248,178,58,1);
              border-radius: 50%;
              font-size: 0.4rem;
              font-family: PingFang;
              font-weight: 500;
              color:rgba(255,255,255,1);
            }
            span:nth-child(2n){
              color:rgba(248,178,58,1);
              width:0.01rem;
              background:rgba(255,255,255,1);
            }
          }
        }
        .choose {
          .van-field/deep/input::-webkit-input-placeholder {
            color: #999999;
            font-size: 0.56rem;
          }
        }
        .hadChoosen {
          .list {
            display: flex;
            flex-direction: column;
            align-items: center;
            .top {
              width: 100%;
              height: 5rem;
              .my-swipe {
                border-radius:0.4rem 0.4rem 0px 0px;
                height: 100%;
              }
              img {
                width: 13.8rem;
                height: 5rem;
              }
            }
            .bottom {
              width: 13.8rem;
              height: 2.06rem;
              background:rgba(255,255,255,1);
              box-shadow:-1px -1px 9px 0px rgba(119,119,119,0.3);
              border-radius: 0px 0px 20px 20px;
              display: flex;
              justify-content: flex-start;
              div {
                display: inline-block;
              }
              .left {
                height: 2.06rem;
                width: 1.76rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 1.32rem;
                  height: 1.32rem;
                  background:rgba(232,57,40,1);
                  border-radius:50%;
                }
              }
              .middle2 {
                height: 2.06rem;
                width: 8rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .title {
                  height:0.88rem;
                  font-size:0.6rem;
                  font-family:PingFang;
                  font-weight:bold;
                  color:rgba(51,51,51,1);
                  line-height:0.88rem;
                }
                .brand {
                  height:0.8rem;
                  font-size:0.3rem;
                  font-family:PingFang;
                  font-weight:400;
                  color:rgba(51,51,51,1);
                  line-height:0.8rem;
                }
              }

              .right {
                flex: 1;
                display: flex;
                align-items: center;
                .btn {
                  width:3.2rem;
                  height:1.2rem;
                  background:rgba(221,11,20,1);
                  border-radius:8px;
                  font-size:0.6rem;
                  font-family:PingFang;
                  font-weight:bold;
                  color:rgba(255,255,255,1);
                  line-height:1.2rem;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      form {
        margin-top: 0.4rem;
        .van-search {
          height: 1.76rem;
        }
        .van-search/deep/.van-search__content {
          background-color: #EEEEEE;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .useList {
        display: flex;
        position: relative;
        margin: 0.6rem 0.6rem 0 0.6rem;
        >img {
          width:4.78rem;
          height:6.4rem;
          background:rgba(255,255,255,1);
          border:0.04rem solid rgba(221,11,20, .3);
          border-radius:8px;
        }
        .right {
          position: absolute;
          left: 4.9rem;
          bottom: 0.4rem;
          width:7.54rem;
          height:3.14rem;
          background:rgba(255,255,255,1);
          box-shadow:4px 6px 21px 0px rgba(119,119,119,0.16);
          border-radius:8px;
          .topUser {
            display: flex;
            height: 2rem;
            align-items: center;
            img {
              width: 1.38rem;
              height: 1.38rem;
              border-radius:50%;
              padding-left: 0.4rem;
            }
            .t_right {
              flex: 1;
              height: 2rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-left: 0.4rem;
              span:first-child {
                display: inline-block;
                height:0.66rem;
                font-size:0.48rem;
                font-family:PingFang;
                font-weight:400;
                color:rgba(248,178,58,1);
                line-height:0.66rem;
              }
              span:last-child {
                display: inline-block;
                height:0.66rem;
                font-size:0.48rem;
                font-family:PingFang;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:0.66rem;
              }
            }
          }
          .vote {
            display: flex;
            align-items: center;
            >span {
              height:0.42rem;
              font-size:0.44rem;
              font-family:PingFang;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:0.42rem;
              padding: 0 0.4rem;
            }
            .voteBtn {
              width:3.2rem;
              height:0.8rem;
              background:rgba(221,11,20,1);
              border-radius:8px;
              font-size:0.48rem;
              font-family:PingFang;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:0.8rem;
              text-align: center;
              padding: 0 0.1rem;
            }
          }
        }
      }
      .van-empty/deep/.van-empty__image {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
  .van-nav-bar/deep/.van-icon {
    color: rgba(51, 51, 51, 1)
  }
  .van-nav-bar/deep/.van-nav-bar__title {
    font-weight: bolder;
  }
</style>
