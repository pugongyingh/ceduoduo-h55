<template>
  <div class="wrapper">
    <div class="top">
      <img src="../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">推荐相册作品</div>
    </div>`
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
