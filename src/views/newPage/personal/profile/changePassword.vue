<template>
    <div class="changePassword">
      <!--      导航栏-->
      <div class="navbar">
        <van-nav-bar
          :title="isConfirmed? '设置新密码':'验证原密码'"
          left-arrow
          :right-text="isConfirmed? '完成':'下一步'"
          @click-right="nextStep"
          @click-left="$router.go(-1)"
        />
        <van-field
          v-model="oldpassword"
          type="password"
          :label="isConfirmed? '设置新密码':'原密码'"
          style="margin-top: 0.4rem"
          :placeholder="isConfirmed? '6-16位数字、英文或下划线':'请输入原密码'"
          right-icon="closed-eye"/>
        <van-field
          v-model="oldpassword"
          type="password"
          v-if="isConfirmed"
          label="设置密码"
          style="margin-top: 0.4rem"
          placeholder="请再次输入密码"
          right-icon="closed-eye"/>
      </div>
    </div>
</template>

<script>
    export default {
        name: "changePassword",
      data() {
          return {
            oldpassword:'',
            isConfirmed:false
          }
      },
      methods:{
          nextStep() {
            if(!this.isConfirmed) {
              this.isConfirmed = true
            }
          }
      }
    }
</script>

<style scoped>

</style>
