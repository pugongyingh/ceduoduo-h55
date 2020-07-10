<template>
    <div class="gameDetail">
      <!--      标头-->
      <van-nav-bar
        :title="contestData.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
<!--      主体内容-->
      <div class="detailBody">
        <!--      置顶图片-->
        <div class="topImg">
          <img :src="contestData.covers" alt="">
        </div>
<!--        报名信息-->
        <div class="signIn">
          <div class="first">
            <div class="top">
              <img src="../../../assets/newImages/daka.jpg" alt="">
              <span>已报名</span>
            </div>
            <div class="bottom">
              <span>{{contestData.applyQuantity}}</span>
            </div>
          </div>
          <p></p>
          <div class="first">
            <div class="top">
              <img src="../../../assets/newImages/daka.jpg" alt="">
              <span>累计投票</span>
            </div>
            <div class="bottom">
              <span>{{contestData.voteQuantity}}</span>
            </div>
          </div>
          <p></p>
          <div class="first">
            <div class="top">
              <img src="../../../assets/newImages/daka.jpg" alt="">
              <span>赛段</span>
            </div>
            <div class="bottom">
              <span>{{contestData.phase}}</span>
            </div>
          </div>
        </div>
<!--        比赛信息-->
        <div class="rateInfo">
          <p>{{contestData.name}}</p>
          <div class="dateMsg"><span></span>开始日期：{{contestData.startAt | updateTime}}</div>
          <div class="dateMsg"><span></span>决赛日期：{{contestData.upgradeAt | updateTime}}</div>
          <div class="dateMsg"><span></span>结束日期：{{contestData.endAt | updateTime}}</div>
          <div class="content" v-html='contestData.description'></div>
        </div>
      </div>
    </div>
</template>

<script>
  import { getById } from '@/services/contest.js'
  export default {
    name: "gameDetail",
    data() {
      return {
        contestData: {
          startAt: '',
          upgradeAt: '',
          endAt: ''
        },
        contestId: 0
      }
    },
    created() {
      this.contestId = this.$route.params.id
      this.getContestDetail(this.contestId)
    },
    methods: {
      getContestDetail(id) {
        getById({id}, res => {
          this.contestData = res
        })
      }
    },
    filters: {
      updateTime(val) {
        return val.split(" ")[0]
      }
    }
  }
</script>

<style lang="less" scoped>
  .gameDetail {
    position: relative;
    .van-nav-bar {
      background-color: transparent;
      /deep/.van-nav-bar__title {
        color: white;
        font-weight: bolder;
      }
      /deep/.van-icon {
        color: #fff;
        padding: 0.2rem;
        font-size: 0.8rem;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 50%;
      }
    }

    /*去掉横白线*/
    .van-nav-bar::after {
      border: none;
    }
    .detailBody {
      position: absolute;
      top: -0.92rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .topImg {
        width: 100%;
        img {
          width: 100%;
          height: 9rem;
        }
      }
      .signIn {
        width:13.8rem;
        height:2.26rem;
        background:rgba(255,255,255,1);
        box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:20px;
        .first{
          width: 4.2rem;
          display: inline-block;
          .top {
            height: 1.24rem;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            img {
              width: 0.72rem;
              height: 0.72rem;
              background:rgba(0,177,228,1);
            }
            span {
              display: inline-block;
              padding: 0 0.1rem;
              height:0.72rem;
              font-size:0.48rem;
              font-family:PingFang;
              font-weight:500;
              color:rgba(102,102,102,1);
            }
          }
          .bottom {
            height: 1rem;
            display: flex;
            justify-content: center;
            align-content: flex-start;
            span {
              height:0.4rem;
              font-size:0.48rem;
              font-family:PingFang;
              font-weight:500;
              color:rgba(51,51,51,1);
            }
          }

        }
        p {
          display: inline-block;
          width:0.01rem;
          height:1.2rem;
          background:rgba(230,230,230,1);
          margin-block-start: 0;
          margin-block-end: 0;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
      }
      .rateInfo {
        margin-top: 0.4rem;
        width: 13.8rem;
        padding-bottom: 0.84rem; 
        background:rgba(255,255,255,1);
        box-shadow:3px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:21px;
        p {
          padding: 0.68rem;
          font-size:0.64rem;
          font-family:PingFang;
          font-weight:bold;
        }
        .dateMsg {
          padding-left: 0.68rem;
          height:1rem;
          font-size:0.48rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:0.48rem;
          span {
            vertical-align: text-bottom;
            margin-right: 0.25rem;
            display: inline-block;
            width:0.08rem;
            height:0.6rem;
            background:rgba(237,0,26,1);
          }
        }
        .content {
          padding: 0.64rem 0.6rem 0 0.6rem;
          font-size: 0.48rem;
          font-family: PingFang;
          font-weight: 500;
          color:rgba(51,51,51,1);
          line-height: 0.72rem;
          /deep/p {
            img {
              width: 100%;
              border-radius: 0.4rem;
            }
          }
          
        }
      }
    }
  }
</style>
