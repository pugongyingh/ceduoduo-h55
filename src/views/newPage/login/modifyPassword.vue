<template>
    <div class="setPassword">
      <van-nav-bar
        title="验证原密码"
        left-arrow
        right-text="下一步"
        @click-left="$router.go(-1)"
        @click-right="toRegister"
      />
      <van-field
        v-if="downIcon"
        @click-right-icon="eye"
        v-model="password"
        type="password"
        label="原密码"
        style="margin-top: 0.4rem"
        placeholder="请输入原密码"
        right-icon="closed-eye">
      </van-field>
      <van-field
        v-if="!downIcon"
        @click-right-icon="eye"
        v-model="password"
        label="原密码"
        style="margin-top: 0.4rem"
        placeholder="请输入原密码"
        right-icon="eye">
      </van-field>
    </div>
</template>

<script>
  import {register,loginWithPhoneAndPassword} from "../../../services/user";

  export default {
        name: "setPassword",
      data() {
          return {
            password:'',
            confirmPwd:'',
            downIcon: false,
          }
      },
      methods:{
        // 密码眼显示隐藏
        eye() {
          this.downIcon = !this.downIcon;
        },
          toRegister() {
          // 跳转设置新密码
            this.$router.push('/setPassword')
            const phone = this.$route.query.phone
            const inviteCode = this.$route.query.inviteCode
            // if(this.password === '' || this.confirmPwd === '') {
            //   this.$toast('请输入密码')
            // } else
            //   if (this.password !== this.confirmPwd) {
            //   this.$toast('两次密码输入不一致')
            // } else
            //   {
            //   register({
            //     phone,
            //     inviteCode,
            //     password:this.password
            //   },res => {
            //       if(res.id) {
            //         this.$toast('注册成功')
            //         loginWithPhoneAndPassword({
            //           password:this.password,
            //           phone
            //         },info => {
            //           if(info.id) {
            //             window.localStorage.setItem('userMsg',JSON.stringify(info))
            //             this.$store.commit('saveUser')
            //             this.$router.push('/userInfo/' + res.id)
            //           }
            //         })
            //       } else {
            //         this.$toast('注册失败')
            //       }
            //   })
            // }
          }
      }
    }
</script>

<style scoped>

</style>
