<template>
  <div class="password">
    <div v-if="activeIndex === 1">
      <van-nav-bar
        title="设置密码"
        left-arrow
        right-text="完成"
        @click-left="$router.go(-1)"
        @click-right="updatePwd"
      />
      <van-field v-model="password" type="password" v-show="!downIcon"  @click-right-icon="eye" right-icon="closed-eye" error-message label="设置密码" style="margin-top: 0.4rem" placeholder="6-16位英文、数字或下划线"/>
      <van-field v-model="password" type="text" v-show="downIcon"  @click-right-icon="eye" right-icon="eye" error-message label="设置密码" style="margin-top: 0.4rem" placeholder="6-16位英文、数字或下划线"/>
      <van-field v-model="confirmpassword" type="password" v-show="!downIcon2"  @click-right-icon="eye2" right-icon="closed-eye" label="确认密码" placeholder="请再次输入新密码" />
      <van-field v-model="confirmpassword" type="text" v-show="downIcon2"  @click-right-icon="eye2" right-icon="eye" label="确认密码" placeholder="请再次输入新密码" />
    </div>
    <div v-if="activeIndex === 0">
      <van-nav-bar
        title="忘记密码"
        left-arrow
        right-text="下一步"
        @click-left="$router.go(-1)"
        @click-right="nextStep"
      />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="tel" type="tel" label="手机号" style="margin-top: 0.4rem" placeholder="请输入手机号码">
        <template #button>
          <!--        <van-button size="small" type="primary">发送验证码</van-button>-->
          <span style="margin-right: 5px" >(53s)</span>
          <span style="font-size:0.56rem;color:rgba(221,11,20,1);" @click="sendCaptcha">发送验证码</span>

        </template>
      </van-field>
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field v-model="captcha" type="digit" label="验证码" placeholder="请输入验证码"/>
    </div>
  </div>
</template>

<script>
  import {
    sendUpdatePasswordCaptcha,checkCaptcha,updatePassword
  } from "../../../services/user";

  export default {
    data() {
      return {
        tel: '',
        captcha: '',
        InvitationCode: '',
        checked: '',
        activeIndex:1,
        password:'',
        downIcon: false,
        downIcon2: false,
        confirmpassword:''
      }
    },
    methods: {
      // 密码眼显示隐藏
      eye() {
        this.downIcon = !this.downIcon;
      },
      eye2() {
        this.downIcon2 = !this.downIcon2;
      },
      onSubmit() {
      },
      sendCaptcha() {
        if(this.tel === '') {
          this.$toast('请输入手机号')
        } else {
          sendUpdatePasswordCaptcha({
            phone:this.tel
          },res => {
            if(res === 'success') {
              this.$toast('发送成功')
            }
          })
        }
      }
      ,
      nextStep() {
        if(this.captcha === '') {
          this.$toast('请输入验证码')
        } else {
          checkCaptcha({
            phone:this.tel,
            captcha:this.captcha
          },res => {
            if(res === '200') {
              if(this.activeIndex === 1) {
                this.activeIndex = 0
              }
            }
          })
        }
      },
      updatePwd() {
        if(this.password === '') {
          this.$toast('请输入密码')
        } else if (this.password !== this.confirmpassword) {
          this.$toast('密码不一致')
        } else {
          updatePassword({
            phone:this.tel,
            password:this.password
          },res => {
            this.$toast('修改成功')
            this.$router.push('/userLogin')
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .password {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;

    .van-nav-bar .van-icon {
      color: #666666;
    }
    .van-nav-bar__text {
      color: #323233;
    }
  }
</style>
