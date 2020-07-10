<template>
    <div class="inviteDeal">
      <div class="navbar">
        <van-nav-bar
          title="邀请成交记录"
          left-arrow
          @click-left="$router.push('/achievenment')"
        />
      </div>
      <div>
        <van-cell title="下级订单返佣" value="+5.25" label="2019-01-28 15：00：00" v-for="i in 6" :key="i" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "inviteDeal"
    }
</script>

<style scoped>

</style>
