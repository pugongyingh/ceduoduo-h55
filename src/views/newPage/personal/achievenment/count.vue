<template>
    <div class="count">
      <div class="navbar">
        <van-nav-bar
          title="余额明细"
          left-arrow
          @click-left="$router.push('/achievenment')"
        />
      </div>

      <div style="margin-top: 0.4rem">
        <van-cell title="下级订单返佣" value="+5.25" label="2019-01-28 15：00：00" v-for="i in 6" :key="i" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "count"
    }
</script>

<style scoped>

</style>
