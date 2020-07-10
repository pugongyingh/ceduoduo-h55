<template>
    <div class="search">
      <div class="navbar">
        <van-nav-bar
          title="搜索"
          left-arrow
          @click-left="$router.push('/alliance')"
        >
        </van-nav-bar>
      </div>

      <div>
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </div>

      <div v-if="list.length > 0" class="list">
        <div class="container" v-for="i in 3">
          <div class="left">
            <p style="font-size: 13px">商家联盟</p>
            <p style="margin-top: 3px;">
              <span><van-icon name="manager" size="10px" /></span>
              <span style="font-size:11px ">99</span>
            </p>
          </div>
          <div class="right">
            <img src="../../../../assets/images/ceshi.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="noneAllience" v-else>
        搜索无结果
      </div>
    </div>
</template>

<script>
    export default {
        name: "search",
      data() {
          return {
            list:[1]
          }
      }
    }
</script>

<style scoped lang="less">
  .container {
    background-color: white;
    width: 13.8rem;
    display: flex;
    height: 3.2rem;
    border: 1px solid #eee;
    margin: 0.4rem auto;
    .left {
      width: 9.8rem;
      p {
        margin-top: 0.8rem;
        margin-left: 0.4rem;
      }
    }
    .right {
      width: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 3.6rem;
        height: 2.4rem;

      }
    }
  }
  .noneAllience {
    text-align: center;
    margin-top:4rem;
    font-size: 13px;
    color: #999;
  }
</style>
