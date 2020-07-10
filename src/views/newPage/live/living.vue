<template>
    <div class="living">
        <!--      标头-->
        <div class="navbar">
          <van-nav-bar
            title="直播名称"
            left-arrow
            @click-left="$router.go(-1)"
          />
        </div>
        <div class="livingBody">
          <div class="img">
            <img :src="liveDetail.introImage" alt="">
          </div>
          <div class="bottom" v-show="!show">
            <div class="title">
              <div class="left">
                <span>{{liveDetail.title}}</span>
                <div class="position">
                  <img src="../../../assets/newImages/i_ic_address.png" alt="">
                  <span>{{liveDetail.location}}</span>
                  <img src="../../../assets/newImages/i_ic_time.png" alt="">
                  <span>{{liveDetail.startAt}}</span>
                </div>
              </div>
              <div class="icon">
                <img src="../../../assets/newImages/wangshang.png" alt="" @click="show = true">
              </div>
            </div>
            <div class="btn">
              <van-button type="danger">购买直播服务</van-button>
            </div>
          </div>
        </div>

<!--      弹出层-->
      <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
        <div class="inner">
          <div class="title">
            <div class="left">
              <span>{{liveDetail.title}}</span>
              <div class="position">
                <img src="../../../assets/newImages/i_ic_address.png" alt="">
                <span>{{liveDetail.location}}</span>
                <img src="../../../assets/newImages/i_ic_time.png" alt="">
                <span>{{liveDetail.startAt}}</span>
              </div>
            </div>
            <div class="icon">
              <img src="../../../assets/newImages/xiangxia.png" alt="" @click="show = false">
            </div>
          </div>
          <div class="circle">
            {{liveDetail.intro}}
          </div>
          <div class="picList">
            <p>照片墙</p>
            <div class="list" v-for="picList in picWall">
              <div class="time">
                <span></span>
                <span>{{picList.createAtHour.split(" ")[0]}}</span>
                <span>{{picList.createAtHour.split(" ")[1]}}</span>
              </div>
              <div class="pic">
                <img :src="pic" alt="" v-for="pic in picList.imageList">
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script>
    import {findLiveDetailById,findAllImageByLiveShowId} from '@/services/square.js'
    export default {
      name: "living",
      data() {
          return {
            show: false,
            liveDetail:{},
            picWall:[]
          }
      },
      mounted() {
        findLiveDetailById({id:this.$route.params.id}, res=>{
          console.log(res)
          this.liveDetail = res
        })
        findAllImageByLiveShowId({
          "liveShowId":this.$route.params.id,
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
          this.picWall = res
          console.log(res)
        })
      }
    }
</script>

<style lang="less" scoped>
.living {

  .livingBody {
    .img {
      width:14.98rem;
      height:19.88rem;
      img{
        width:14.98rem;
        height:19.88rem;
      }
    }
    .bottom {
      height:4.8rem;
      background:rgba(255,255,255,1);
      border-radius:0.2rem 0.2rem 0px 0px;
      .title {
        display: flex;
        .left {
          padding-left: 0.6rem;
          padding-top: 0.2rem;
          >span {
            font-size:0.6rem;
            font-family:PingFang;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:1.14rem;
          }
          .position {

            img {
              width: 0.52rem;
              height: 0.52rem;
            }
            span {
              display: inline-block;
              vertical-align: center;
              font-size:0.44rem;
              font-family:PingFang;
              font-weight:400;
              color:rgba(119,119,119,1);
              line-height:1.14rem;
            }
          }
        }
        .icon {
          flex: 1;
          text-align: right;
          img {
            margin: 0.6rem 1rem 0 0;
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }
      .btn {
        text-align: center;
        >button {
          margin-top: 0.4rem;
          width:10rem;
          height:1.2rem;
          background:rgba(237,0,26,1);
          border-radius:0.16rem;
        }
      }
    }
  }
  .van-overlay {
    background-color: transparent;
  }
  .van-popup--bottom {
    border-radius:0.2rem 0.2rem 0px 0px;
    .inner{
      padding-left: 15px;
    }
    .title {
      display: flex;
      .left {
        >span {
          font-size: 0.6rem;
          font-family: PingFang;
          font-weight: bold;
          color: #333333;
          margin-top: 0.5rem;
          display: block;
          line-height:1.14rem;
        }
        .position {
          img {
            width: 0.52rem;
            height: 0.52rem;
          }
          span {
            display: inline-block;
            vertical-align: center;
            font-size:0.44rem;
            font-family:PingFang;
            font-weight:400;
            margin-right: 0.32rem;
            color:rgba(119,119,119,1);
            line-height:1.14rem;
          }
        }
      }
      .icon {
        flex: 1;
        text-align: right;
        img {
          margin: 0.6rem 1rem 0 0;
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }
    .circle {
      width:13.8rem;
      height:3.8rem;
      background:rgba(255,255,255,1);
      border:1px solid rgba(204,204,204,1);
      border-radius:0.16rem;
      font-size:0.48rem;
      font-family:PingFang;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:0.84rem;
      padding: 5px 0 0 5px;
      overflow-y: auto;
    }
    .picList {
      margin-top: 0.5rem;
      p {
        height:0.84rem;
        font-size:0.6rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.84rem;
      }
      .list {
        margin-bottom: 0.4rem;
        .time {
          margin-left: 0.2rem;
          >span:first-child {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            background-color: rgb(237,0,26);
            border-radius: 50%;
          }
          span {
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.96rem;
          }
        }
        .pic {
          margin-top: 0.2rem;
          img {
            width:2.4rem;
            height:2.4rem;
            border-radius: 0.24rem;
            margin: 0 0.2rem;
          }
        }
      }

    }
  }
}
</style>
