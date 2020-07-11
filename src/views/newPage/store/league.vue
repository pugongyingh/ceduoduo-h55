<template>
  <div class="league">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">商家联盟列表</div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "league",
    data() {
      return {

      }
    },
    methods: {

    }
  }

</script>

<style scoped lang="less">

  .league {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #FAFAFA;
    .top {
      border-bottom: 1px solid #E6E6E6;
      /*width: 15rem;*/
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
  }

</style>
