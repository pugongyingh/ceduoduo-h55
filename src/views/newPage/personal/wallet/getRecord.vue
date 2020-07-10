<template>
    <div class="getRecord">
      <div class="navbar">
        <van-nav-bar
          title="提现记录"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>

      <div style="margin-top: 0.4rem;background:#fff;" class="money">
        <p style="font-size: 18px;margin-top: 0.4rem">累计提现</p>
        <p style="font-size: 25px;color:#ED001A;margin-top: 0.56rem">￥555.00</p>
      </div>

      <div style="margin-top: 0.4rem">
        <van-cell title="下级订单返佣" value="+5.25" label="2019-01-28 15：00：00" v-for="i in 6" :key="i" />
      </div>

    </div>
</template>

<script>
    export default {
        name: "getRecord"
    }
</script>

<style scoped>
  .money {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
</style>
