<template>
  <div class="wrapper">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">推荐相册作品</div>
    </div>
    <van-tabs v-model="activeId" @change="tabChange">
      <van-tab title="全部" :name="-1">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已经到底了~"
          @load="onLoad"
        >
          <div class="temp-wrap">
            <div class="temp-item" v-for="item in tempList" :key="item.id">
              <div class="temp-img"><img :src="item.cover" alt=""></div>
              <div class="temp-title">{{item.name}}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab v-for="(item, index) in categoryList" :title="item.name" :name="item.id">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已经到底了~"
          @load="onLoad"
        >
          <div class="temp-wrap">
            <div class="temp-item" v-for="item in tempList" :key="item.id">
              <div class="temp-img"><img :src="item.cover" alt=""></div>
              <div class="temp-title">{{item.name}}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
	export default {
		name: "index",
		data() {
			return {}
		},
		methods: {}
	}

</script>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .top {
      border-bottom: 1px solid #E6E6E6;
      width: 15rem;
      height: 2rem;
      line-height: 2rem;
      position: relative;
      .nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.72rem;
        font-family:PingFang;
        font-weight:bold;
      }
      .fanhui {
        position: absolute;
        left: 0.68rem;
        top: 0.6rem;
        width: 0.4rem;
        height: 0.78rem;
      }
    }
    .temp-wrap {
      text-align: center;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .temp-item {
        flex: 0 0 33.33%;
        margin: 0.3rem 0 0.3rem;
        width: 33.33%;
        .temp-img {
          img {
            width: 4.2rem;
            height: 5.36rem;
          }
        }
        .temp-title {
          text-align: center;
          font-size:0.52rem;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
    }

  }


</style>
