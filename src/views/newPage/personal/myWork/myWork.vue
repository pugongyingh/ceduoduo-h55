<template>
    <div class="collection">
      <div class="top">
        <div class="goback" @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </div>
        <div class="bg">
          <img src="../../../../assets/images/ceshi.jpg" style="height: 270px;width: 100%" alt="">
        </div>
        <div class="avatar" style="width: 3.6rem;height: 3.6rem">
          <img :src="user.avatar" alt="">
        </div>
        <div class="title">
          <p style="font-size: 18px;">{{user.nickname}}</p>
          <p style="font-size: 11px;margin-top: 0.4rem">欢迎大家来看我的作品哦~</p>
        </div>
      </div>
      <div class="middle">
        <van-tabs :border="false" v-model="active">
          <van-tab title="我的作品">
            <div class="container">
              <div class="imgList" v-for="item in product" >
                <div class="inner">
                  <img :src="item.cover" alt="" @click="toDetail(item.id)">
                  <span v-if="item.jurisdiction !== '私密'" @click="handlePick">公开</span>
                  <span v-else>私密</span>
                </div>
                <span>{{item.name}}</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="我的收藏">
            <div class="container">
              <div class="imgList" v-for="item in collections" >
                <div class="inner">
                  <img :src="item.cover" alt="" @click="toDetail(item.id)">
                </div>
                <span>{{item.name}}</span>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

    </div>

</template>

<script>
  import {findByUserId} from "../../../../services/template";
  import {get} from "../../../../services/user";
  import {search,findAlbumUserShopDTOById} from "../../../../services/album";

  import { Dialog } from 'vant';
    export default {
        name: "myCollection",
      data() {
          return {
            active:this.$route.query.tab,
            isPrivate:false,
            product:[],
            user:{},
            collections:[]
          }
      },
      methods: {
        // 选中弹出框
        handlePick() {
          // 私密作品，提示框
          if (this.isPrivate) {
            Dialog.confirm({
              title: '该相册为私密相册',
              message: '选择参赛后将会修改状态 为公开确认选择 “相册名称1” 为参赛作品吗？',
              confirmButtonColor: '#ED001A'
            })
              .then(() => {
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }
        },
        toDetail(id) {
          this.$router.push('/workDetail/'+id)
        },
      },
      mounted() {
        findByUserId({pageable:{
            page:this.page,
            size:this.size,
            sort:this.sort
          }},res => {
          this.collections = res
        })

        get({id:this.$store.state.user.id},res => {
          this.user = res
        })

        search({pageable:{
            page:this.page,
            size:this.size,
            sort:this.sort
          },product:{}},res => {
          this.product = res
        })
      }
    }
</script>

<style scoped lang="less">
    .top {
      height:12rem;
      width: 100%;
      position: relative;
      background-color: #fff;
      .bg {
        width: 100%;
        height: 10.8rem;
      }
    }
    .avatar {
      position: absolute;
      left: 0.64rem;
      top: 8.44rem;
      border-radius: 50%;
      img {
        border-radius: 50%;
        width: 3.6rem;
        height: 3.6rem;
      }
    }

  .title {
    position: absolute;
    left: 4.6rem;
    top: 9.76rem;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .imgList {
      margin: 0.3rem;
      width:4.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .inner{
        position: relative;
        width:4.2rem;
        height:5.6rem;
        span {
          position: absolute;
          left: 0;
          top: -0.3rem;
          display: inline-block;
          text-align: center;
          width:1.32rem;
          height:0.68rem;
          line-height:0.68rem;
          background:rgba(221,11,20,1);
          border-radius:10px 0;
          font-size:0.4rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
        span:last-child {
          display: inline-block;
          text-align: center;
          width:1.32rem;
          height:0.68rem;
          line-height:0.68rem;
          background:rgba(248,178,58,1);
          border-radius:10px 0;
          font-size:0.4rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
        img {
          width:4.2rem;
          height:5.6rem;
          border-radius:10px;
        }
      }
      span {
        display: inline-block;
        margin-top: 0.32rem;
        height:0.5rem;
        font-size:0.52rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.5rem;
      }
    }
  }

  .box {
    margin-top: 10px;
    width: 4.2rem;
    height: 5.56rem;
    border-radius: 5px;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }

  }

  .goback {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
  }
</style>
