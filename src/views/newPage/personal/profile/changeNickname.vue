<template>
    <div class="changeNickname">
      <div class="navbar">
        <van-nav-bar
          title="个人资料"
          left-arrow
          right-text="完成"
          @click-left="$router.go(-1)"
          @click-right="$router.push()"
        />
      </div>
      <van-field v-model="nickname" type="password" label="昵称" placeholder="请输入昵称" />
    </div>
</template>

<script>
    export default {
        name: "changeNickname",
      data() {
          return {
            nickname:''
          }
      }
    }
</script>

<style scoped>

</style>
