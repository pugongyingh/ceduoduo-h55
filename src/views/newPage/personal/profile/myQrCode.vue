<template>
    <div class="myqrcode">
      <van-nav-bar
        title="我的二维码"
        left-arrow
        @click-left="$router.go(-1)"
      />

      <div class="card">
        <div class="title">
            <div class="avatar">
              <img src="../../../../assets/images/ceshi.jpg">
            </div>
            <div class="nickname">
              <span>
                昵称
              </span>
            </div>
        </div>
        <div class="code">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="text">
          <p>扫一扫上面的二维码图案，加我为好友</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myQrCode"
    }
</script>

<style scoped lang="less">
  .myqrcode {
    text-align: center;
  }
  .card {
    margin:0.72rem auto;
    width: 13.76rem;
    height: 17.6rem;
    box-shadow:2px 4px 1px 1px rgba(0,0,0,.1),-2px 0px 1px 1px rgba(0,0,0,.1) ;
    border-radius: 0.4rem;
  }
  .title {
    text-align: left;
    width: 100%;
    height: 4.4rem;
    position: relative;
    padding-top: 1.2rem;
    padding-left: 1.2rem;
    box-sizing: border-box;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  }
  .nickname {
    position: absolute;
    top: 1.6rem;
    left: 4.44rem;
    font-size:14px ;
  }
  .code {
    img {
      width: 10.4rem;
      height: 10.4rem;
    }
  }
  .text p {
    font-size: 0.56rem;
    color: #F8B23B;
  }
</style>
