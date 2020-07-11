<template>
  <div class="albumMore">
    <van-nav-bar
      title="更多"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="moreBody">
      <div class="list" v-for="item in moreList" @click="toAlbumCategoryProduct(item)">
        <img :src="item.picture" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {search,findHomePageNew} from '@/services/templateCategory'
    export default {
        name: "albumMore",
      data() {
        return {
          moreList:[]
        }
      },
      methods:{
        toAlbumCategoryProduct (item){
          this.$router.push({
            name: 'albumCategoryProduct',
            query: {
              platformProduct	:item,
            }
          })
        }
      },
      created() {
        let that = this
        findHomePageNew({},res=> {
          that.moreList = res.category
        })
      },
    }
</script>

<style lang="less" scoped>
.albumMore {
  .moreBody {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .list {
      margin: 0.3rem;
      width:4.2rem;
      height:4.2rem;
      background:rgba(255,255,255,1);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 2.6rem;
        height: 2.6rem;
      }
      span {
        margin-top: 0.2rem;
        height:0.5rem;
        font-size:0.52rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }

  }
}
</style>
