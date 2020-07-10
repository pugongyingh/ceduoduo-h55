<template>
  <div class="posterShare">
    <van-nav-bar
      title="我的海报"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container shadowBox">
      <div class="poster">
        <img :src="imgUrl" alt="">
        <div class="qrcode">
          <img :src="qrcode" alt="">
        </div>
      </div>
      <div class="tip">
        <span>扫一扫上面的二维码图案，制作精美电子相册</span>
      </div>
    </div>
  </div>


</template>

<script>
  import {findPoster,get} from "../../../../services/user";

  export default {
        name: "posterShare",
    data() {
          return {
            imgUrl:'',
            qrcode:''
          }
    },
    computed:{
          id() {
            return this.$store.state.user.id
          }
    },
    mounted() {
          findPoster({},res => {
            this.imgUrl = res
          })
          get({id:this.id},res => {
            console.log(res)
            this.qrcode = res.qrCode
          })
    }
  }
</script>

<style scoped lang="less">
  .container {
    margin:0.38rem auto;
    width: 13.8rem;
    height: 23.32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem ;
    /*box-shadow:2px 2px 1px 1px rgba(243,243,243,1),-2px 0px 1px 1px rgba(243,243,243,1) ;*/
    .poster {
      border-radius: 0.4rem ;
      width: 12.92rem;
      height: 21.56rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .qrcode {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        width: 2.72rem;
        height: 2.72rem;
        border: 1px solid #000;
      }
    }
    .tip {
      margin-top: 5px;
      font-size: 14px;
      color: #333;
      /*font-family: PingFang-SC-Medium;*/
    }

  }

</style>
