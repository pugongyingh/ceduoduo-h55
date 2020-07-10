<template>
    <div class="workDetail">
      <van-nav-bar
        title="相册标题"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="detailBody">
        <div class="right">
          <div class="d_avatar">
            <img :src="user.avatar" alt="">
            <span>{{user.nickname}}</span>
          </div>
          <div class="d_share">
            <img src="../../../../assets/newImages/fenxiang.png" alt="">
            <span>分享</span>
          </div>
          <div class="d_more" @click="show = true">
            <img src="../../../../assets/newImages/_s-g6_ic_more.png" alt="">
            <span>更多</span>
          </div>
          <div class="d_music">
            <img src="../../../../assets/newImages/yinyue.png" alt="">
          </div>
        </div>
        <div class="left">
          <van-button type="default">购买相册</van-button>
          <div class="title">{{albumDetail.shopName}}</div>
        </div>
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '24%' }">
        <div class="top">
          <div class="first" @click="toDetail(id)">
            <img src="../../../../assets/newImages/g6_pop_ic_set.png" alt="">
            <span>权限设置</span>
          </div>
          <div class="second" @click="toDelete(id)">
            <img src="../../../../assets/newImages/g6_pop_ic_del.png" alt="">
            <span>删除</span>
          </div>
          <div class="third"></div>
        </div>
        <div class="cancel" @click="show = false">
          取消
        </div>
      </van-popup>
    </div>
</template>

<script>
  import {findAlbumUserShopDTOById,deletionList} from "../../../../services/album";
  import {get} from "../../../../services/user";
  import {Toast} from 'vant'
  import {Dialog} from 'vant'

  export default {
      name: "workDetail",
      data() {
        return {
          show: false,
          albumDetail:'',
          user:''
        }
      },
    computed:{
        id() {
          return this.$route.params.id
        }
    },
      methods: {
        toDetail(id) {
          this.$router.push('/workSetting/'+id)
        },
        toDelete(id) {
          Dialog.confirm({
            title: '删除',
            message: '确认删除?',
          })
            .then(() => {
              deletionList({idList:[id]},res => {
                Toast('删除成功')
                this.$router.go(-1)
              })
            })
        }
      },
      mounted() {
        findAlbumUserShopDTOById({id:this.$route.params.id},res => {
          this.albumDetail = res
          this.$nextTick(() => {
            const workDetail = document.querySelector('.workDetail')
            workDetail.style.backgroundImage = 'url(\'' + this.albumDetail.albumCover + '\')'
          })
        })

        get({id:this.$store.state.user.id},res => {
          this.user = res
        })
      }
    }
</script>



<style lang="less" scoped>
  .workDetail {
    height: 100vh;
    background-image: url("../../../../assets/images/ceshi.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    .detailBody {
      height: 93vh;
      position: relative;
      .right {
        position: absolute;
        right: 0.64rem;
        bottom: 1.8rem;
        .d_avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width:1.72rem;
            height:1.72rem;
            border-radius:50%;
          }
          span {
            display: inline-block;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:0.76rem;
            text-shadow:0px 0.04rem 0px rgba(0, 0, 0, 0.46);
          }
        }
        .d_share {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0.92rem;
          img {
            width:1.34rem;
            height:1.02rem;
          }
          span {
            display: inline-block;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:0.76rem;
            text-shadow:0px 0.04rem 0px rgba(0, 0, 0, 0.46);
          }
        }
        .d_more {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0.92rem;
          img {
            width:1.36rem;
            height:1.36rem;
          }
          span {
            display: inline-block;
            font-size:0.56rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:0.76rem;
            text-shadow:0px 0.04rem 0px rgba(0, 0, 0, 0.46);
          }
        }
        .d_music {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0.92rem;
          img {
            width:1.72rem;
            height:1.72rem;
            background:rgba(255,255,255,1);
            border-radius:50%;
          }
        }
      }
      .left{
        position: absolute;
        bottom: 1.8rem;
        left: 0.62rem;
        button{
          width:3.6rem;
          height:0.88rem;
          background:rgba(255,179,0,1);
          font-size:0.52rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:0.76rem;
        }
        .van-button--default {
          border: none;
        }
        .title {
          margin-top: 0.52rem;
          font-size:0.64rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:0.76rem;
        }
      }
    }

    .van-popup--bottom {
      .top {
        display: flex;
        height: 4.4rem;
        .first {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          img {
            width: 1.14rem;
            height: 1.12rem;
          }
          span {
            display: inline-block;
            font-size:0.46rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.94rem;
          }
        }
        .second {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          img {
            width: 0.94rem;
            height: 1.12rem;
          }
          span {
            display: inline-block;
            font-size:0.46rem;
            font-family:PingFang;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.94rem;
          }
        }
        .third {
          flex: 3;
        }
      }
      .cancel {
        height:2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background:rgba(237,237,237,1);
        font-size:0.66rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(48,47,47,1);
        line-height:0.94rem;
      }
    }

    .van-nav-bar {
      background-color: transparent;
    }

    /*深度选择器更改title颜色*/
    .van-nav-bar /deep/ .van-nav-bar__title {
      color: white;
    }

    /*去掉横白线*/
    .van-nav-bar::after {
      border: none;
    }
  }

</style>
