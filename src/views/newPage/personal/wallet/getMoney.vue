<template>
    <div class="getMoney">
      <div class="navbar">
        <van-nav-bar
          :title="isChooseMethod? '付款方式选择':'提现'"
          left-arrow
          @click-left="isChooseMethod? isChooseMethod = false:$router.push('/wallet/' + $store.state.user.id)"
        >
          <template v-if="isChooseMethod" #right>
            <van-icon name="plus" size="18" @click="$router.push('accountManager')" />
          </template>
        </van-nav-bar>
      </div>

      <div v-if="!isChooseMethod">
        <van-cell title="选择到账方式" style="margin-top: 0.4rem" is-link @click="isChooseMethod = true"/>

        <div class="count" style="margin-top: 0.4rem">

          <van-cell title="提现金额" :border="false"/>

          <div class="container">
            <span class="symbol">￥</span>
            <input v-model="money" class="ipt" type="text">
          </div>

          <div class="left" style="padding-top: 5px">
          <span style="font-size:11px;position:absolute;left:0.62rem ">
            可提现余额
            <span style="color: #FAC468 ">1000</span>
          </span>
            <span style="font-size: 14px;color: #ED001A;position:absolute;right:0.62rem">全部提现</span>
          </div>
        </div>

        <div class="check">
          <van-checkbox v-model="checked" style="font-size: 12px;margin-left: 0.6rem">提现即代表《提现协议》</van-checkbox>
        </div>

        <div class="button">
          提现
        </div>
      </div>

<!--      付款方式选择-->
    <div v-else>
      <van-cell title="中国银行" label="尾号 8888" v-for="i in 5" :key="i" />
    </div>

    </div>
</template>

<script>
    export default {
        name: "getMoney",
        data() {
          return {
            value1:'',
            money:'',
            checked:'',
            isChooseMethod:false
          }
        },
      methods:{

      }
    }
</script>

<style scoped>
   .symbol {
     font-size:40px ;
     padding: 0.4rem 0.4rem;
     color: #ED001A;
     box-sizing: border-box;
   }

   .container {
     position: relative;
     padding-bottom: 0.4rem;
     border-bottom: 1px solid #eee;
     background: #fff;
   }

    .ipt {
      position: absolute;
      height: 1.92rem;
      border: none;
      outline: none;
    }

  .left {
    position: relative;
  }

  .check {
    margin-top: 30px;
  }

  .button {
    margin: 1.4rem auto;
    border-radius: 0.8rem;
    background-color: #ED001A;
    text-align: center;
    height: 1.6rem;
    width: 9.6rem;
    line-height: 1.6rem;
    color: white;
    font-size: 18px;
  }
</style>
