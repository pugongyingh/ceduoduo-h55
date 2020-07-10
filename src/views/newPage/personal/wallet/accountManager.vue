<template>
    <div class="accountManager">
      <div class="navbar">
        <van-nav-bar
          title="到账账号"
          left-arrow
          @click-left="$router.go(-1)"
          right-text="完成"
          @click-right="$router.push('/getMoney')"
        >
        </van-nav-bar>
      </div>

      <div style="margin-top: 0.4rem">
        <van-field v-model="value1" label="持卡人" placeholder="请输入持卡人姓名" />
        <van-field v-model="value2" label="卡号" placeholder="请输入卡号" />
        <van-cell is-link label="开户行" value="请选择" />
        <van-field v-model="value3" label="开户支行" placeholder="例如 越秀支行" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "accountManager",
      data() {
          return {
            value1:'',
            value2:'',
            value3:''
          }
      }
    }
</script>

<style scoped>

</style>
