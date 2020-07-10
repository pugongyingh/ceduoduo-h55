<template>
    <div class="chooseAvatar">
      <!--      导航栏-->
      <div class="navbar">
        <van-nav-bar
          title="选择头像"
          left-arrow
          right-text="完成"
          @click-left="$router.go(-1)"
          @click-right="finished"
        />
      </div>

      <div class="imageList">
        <div class="img-container" v-for="(item,index) in imageList" :key="index" @click="chooseImg(index)">
          <img  :src="item.image" alt="">
          <van-icon name="checked" :class="{'check-icon':index === checkIndex,'uncheck-icon':index !== checkIndex}"/>
        </div>
      </div>
    </div>
</template>

<script>
  import {searchImages} from "../../../../services/systemImages";

  export default {
        name: "chooseAvatar",
    data() {
          return {
            imageList:[],
            checkIndex:-1
          }
    },
    mounted() {
          searchImages({
            pageable:{
              page:1,
              size:10000,
              sort:{desc:['id']}
            },
            systemImage:{
              type:'AVATAR'
            }
          },res => {
            this.imageList = res
          })
    },
    methods:{
          chooseImg(index) {
            this.checkIndex = index
          },
      finished() {
            this.$router.push(this.$store.state.lastRouter + '?img=' + this.imageList[this.checkIndex].image)
      }
    }
  }
</script>

<style scoped lang="less">
  .imageList {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .img-container {
      height: 3.2rem;
      width: 25%;
      padding: 0.2rem;
      box-sizing: border-box;
      position: relative;
      .check-icon {
        position: absolute;
        bottom: 0.4rem;
        right: 0.32rem;
        color: rgb(25,137,250);
      }
      .uncheck-icon {
        position: absolute;
        bottom: 0.4rem;
        right: 0.32rem;
        color: rgba(255,255,255,0);
      }
      img {
        border-radius:0.2rem ;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
