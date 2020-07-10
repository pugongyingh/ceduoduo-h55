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
              <div class="box" v-for="(item,index) in product">
                <img :src="item.cover" alt="">
                <span>{{item.name}}</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="我的收藏">
            <div class="container">
              <div class="box" v-for="(item,index) in collections">
                <img :src="item.cover" alt="">
                <span>123</span>
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
  import {search} from "../../../../services/album";

  export default {
        name: "myCollection",
      data() {
          return {
            active:1,
            page:1,
            size:10,
            sort:{
              desc:['id']
            },
            collections:[],
            user:{
              avatar:'',
              nickname:''
            },
            product:{}
          }
      },
    methods:{
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
  }

  .box {
    margin-top: 10px;
    width: 4.2rem;
    height: 5.56rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.8rem;
    span {
      font-size: 16px;
    }
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
