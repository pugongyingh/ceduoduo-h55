<template>
    <div class="wallet">
      <div class="navbar">
        <van-nav-bar
          title="我的钱包"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>

      <div class="card">
        <p style="font-size: 17px;margin-top: 0.58rem">卡包</p>
        <p style="font-size: 40px;margin-top: 1.2rem;color: #F8B23A">{{wallet.userCouponCount}}</p>
      </div>
      <van-cell title="查看卡包" is-link  />

      <div class="card">
        <p style="font-size: 17px;margin-top: 0.58rem">积分</p>
        <p style="font-size: 40px;margin-top: 1.2rem;color: #F8B23A">{{wallet.totalPoint}}</p>
      </div>
      <van-cell title="积分明细" is-link @click="$router.push('/walletDetail?type=score')" />

      <div class="card">
        <p style="font-size: 17px;margin-top: 0.58rem">金额（元）</p>
        <p style="font-size: 40px;margin-top: 1.2rem;color: #ED001A">{{wallet.balance}}</p>
      </div>
      <van-cell title="提现申请" is-link @click="$router.push('/getMoney')" />
      <van-cell title="收益明细" is-link @click="$router.push('/walletDetail?type=money')" />
      <van-cell title="提现记录" is-link @click="$router.push('/getRecord')" />
    </div>
</template>

<script>
  import {findWalletWithUserId} from "../../../../services/user";

  export default {
        name: "index",
    data() {
          return {
            wallet:{}
          }
    },
    computed:{
          id() {
            return this.$route.params.id
          }
    },
    mounted() {
      findWalletWithUserId({id:this.id},res => {
          this.wallet = res
      })
    }
  }
</script>

<style scoped lang="less">
  .card {
    overflow: hidden;
    margin-top: 0.42rem;
    background-color: #fff;
    width: 100%;
    height: 4.48rem;
    padding-left: 0.7rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
</style>
