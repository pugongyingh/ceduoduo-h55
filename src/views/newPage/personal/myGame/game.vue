<template>
    <div class="game">
      <div class="navbar">
        <van-nav-bar
          title="我的赛事"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>

      <van-tabs v-model="active">
        <van-tab title="我参与的赛事">
          <div class="container" v-for="(item,index) in myGame" :key="index">
            <div class="top">
              <div class="left">
                <img :src="item.storeCover" alt="" style="width: 1.2rem;height: 1.2rem;border-radius: 50%;">
              </div>
              <div class="top-middle">
                <p style="font-size: 13px">{{item.storeName}}</p>
                <p style="font-size: 10px">{{item.storeAddress}}</p>
              </div>
              <div class="right">
                <div>
                  进入大赛
                </div>
              </div>

            </div>
            <div class="middle">
              <img :src="item.covers" alt="">
              <div>
                {{item.phase}}
              </div>
            </div>
            <div class="bottom">
              <div class="bottom-left">
                <div>
                  <span v-html="item.description">
                </span>
                </div>
              </div>
              <div class="bottom-right">
                    <div>
                      <van-icon name="contact" />
                      <span>{{item.voteQuantity}}</span>
                    </div>
                    <div>
                      <van-icon name="clock-o" />
                      <span>{{item.startAt}}</span>
                    </div>
              </div>
            </div>
          </div>
        </van-tab>


        <van-tab title="获奖作品">
          <div class="work shadowBox" v-for="i in 5">
            <div class="top">
              <img src="../../../../assets/images/ceshi.jpg" alt="">
              <span>相册相册相册</span>
            </div>
            <div class="bottom">
              <div class="left">
                <img src="../../../../assets/images/ceshi.jpg" alt="">
              </div>
              <div class="middle">
                <span>用户昵称</span>
              </div>
              <div class="right">
                <div class="button">分享</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
  // import {findWithUserId} from "../../../../services/contest";
  import {findAlbumWithUserId} from "../../../../services/album";

  export default {
      name: "game",
      data() {
          return {
            active:0,
            page:1,
            size:1000,
            sort:{desc:['id']},
            myGame:[],
            winnerAlbum:[]
          }
      },
    mounted() {
          findWithUserId({
            pageable:{
              page:this.page,
              size:this.size,
              sort:this.sort
            }
          },res => {
            this.myGame = res
          })

        findAlbumWithUserId({
          pageable:{
            page:this.page,
            size:this.size,
            sort:this.sort
          }
        },res => {
          this.winnerAlbum = res
        })
    }
  }
</script>

<style scoped lang="less">
  .container {
    margin-top: 5px;
    .top {
      display: flex;
      height: 60px;
      .left {
        padding-left: 0.6rem;
        padding-top: 0.42rem;
        box-sizing: border-box;
        width: 2rem;
      }
      .top-middle {
        padding-top: 0.42rem;
        box-sizing: border-box;
        width: 10rem;
      }
      .right {
        height: 100%;
        padding-top: 0.42rem;
        box-sizing: border-box;
        width: calc(100% - 2rem - 12rem);
        div {
          font-size: 12px;
          color: #ED001A;
          width: 2.4rem;
          height: 1rem;
          border-radius: 4px;
          border: 1px solid #ED001A;
          line-height: 1rem;
          text-align: center;
        }
      }
    }

    .middle {
      width: 100%;
      height: 14rem;
      display: flex;
      position: relative;
      justify-content: center;
      img {
        border-radius: 5px;
        width: 10rem;
        height: 14rem;
      }
      div {
        position: absolute;
        width: 1.7rem;
        height: 1rem;
        background: #F39800;
        text-align: center;
        line-height: 1rem;
        color: white;
        font-size: 11px;
        right: 0;
        top: 2rem;
      }
    }

    .bottom {
      display: flex;
      position: relative;
      padding-top: 0.32rem;
      box-sizing: border-box;
      height: 1.2rem;
      .bottom-left {
        position: absolute;
        font-size: 14px;
        left: 0.82rem;
      }

      .bottom-right {
        position: absolute;
        right: 0.82rem;
        display: flex;
        font-size: 14px;

      }
    }
  }

  .work {
    width: 13.76rem;
    height: 8.04rem;
    border-radius: 10px;
    margin: 0.4rem auto;
    .top {
      height: 6rem;
      position: relative;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px 10px 0 0;
      }
      span {
        position: absolute;
        left: 0.38rem;
        bottom: 0.6rem;
        font-size: 13px;
        color: white;
      }
    }
    .bottom {
      height: 2.04rem;
      display: flex;
      .left {
        height: 100%;
        flex: 1;
        line-height: 2.04rem;
        padding-left: 0.8rem;
        box-sizing: border-box;
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
        }
      }
      .middle {
        height: 100%;
        flex: 5;
        font-size: 14px;
        line-height: 2.04rem;
      }
      .right {
        height: 100%;
        flex: 1;
        padding-top: 0.4rem;
        padding-right: 0.4rem;
        .button {
          width: 2.2rem;
          height: 1.08rem;
          border-radius: 0.54rem;
          text-align: center;
          line-height: 1.08rem;
          background-color: #ED001A;
          color: white;
          font-size: 10px;
        }
      }
    }
  }
</style>
