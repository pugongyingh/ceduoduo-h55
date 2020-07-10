<template>
  <div class="chooseMall">
<!--    导航栏搜索框-->
    <div class='search'>
      <div class='back' @click='back'>
        <img src="../../../assets/images/back-left.png" alt="">
      </div>
      <form action="/">
        <van-search
          v-model="value"
          :left-icon="require('../../../assets/images/搜索.png')"
          clearable
          placeholder="选择参赛店铺"
          @search="onSearch"
          shape="round"
          @clear='resetSearch'
        />
      </form>
    </div>
<!--    参赛主体内容-->
    <div class="mallBody">
      <div class="list" v-for='(item, index) in storeData' :key='index'>
        <div class="top" v-if='item.storeBanner'>
          <img :src="item.storeBanner.split(';')[0]" alt="">
        </div>
        <div class="bottom">
          <div class="left">
            <img :src="item.storeCover" alt="">
          </div>
          <div class="middle2">
            <div class="title">{{item.storeName}}</div>
            <div class="brand">社群：{{item.allianceName}}</div>
          </div>
          <div class="right">
            <div class="btn" @click='confirmSelectStore(item.storeId)'>选择</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { findByKeyWord } from '@/services/store'
  import { saveByContestIdAndStoreIdAndAlbumIdWithUserId } from '@/services/contestAlbum'
  export default {
    name: "chooseMall",
    data() {
      return {
        value: '',
        page: 1,
        size: 10,
        // 店铺数组对象
        storeData: [],
      }
    },
    methods: {
      // 确认选择店铺
      confirmSelectStore(storeId) {
        console.log(storeId)
        this.$router.push({path: '/bigGame/' + this.contestId, query: {storeId}})
      },
      back() {
        this.$router.go(-1)
      },
      // 搜索
      onSearch() {
        findByKeyWord({
          keyWord: this.value,
          pageable: {
            page: this.page,
            size: this.size,
            sort: {desc: ['id']}
          }
        }, res => {
          this.storeData = res
        })
      },
      // 重置搜索
      resetSearch() {
        findByKeyWord({
          keyWord: '',
          pageable: {
            page: this.page,
            size: this.size,
            sort: {desc: ['id']}
          }
        }, res => {
          console.log(res)
          this.storeData = res
        })
      },
      // 获取店铺数据
      getStore() {
        findByKeyWord({
          keyWord: "",
          pageable: {
            page: this.page,
            size: this.size,
            sort: {desc: ['id']}
          }
        }, res => {
          console.log(res)
          this.storeData = res
        })
      }
    },
    created() {
      // 获取店铺数据
      this.getStore()
      this.contestId = parseInt(this.$route.query.contestId)
    }
  }
</script>

<style lang="less" scoped>
  .chooseMall {
    .search {
      height: 1.76rem;
      box-sizing: border-box;
      background-color: #fff;
      padding: 0.32rem 0.6rem;
      display: flex;
      .back {
        display: flex;
        align-items: center;
        flex: 0 0 1.2rem;
        height: 100%;
        img {
          width: 0.44rem;
          height: 0.72rem;
        }
      }
      form {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-search {
          padding: 0;
          width: 100%;
        }
        .van-search/deep/.van-search__content {
          background-color: #EEEEEE;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      
    }
    .mallBody {
      padding: 0.6rem;
      .list {
        &:first-child {
          margin-top: 0;
        }
        margin-top: 0.4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top {
          height: 5rem;
          img {
            width: 100%;
            height: 5rem;
            object-fit: cover;
            border-radius:20px 20px 0px 0px;
          }
        }
        .bottom {
          width: 100%;
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
            justify-content: flex-end;
            padding-right: 0.86rem;
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
</style>
