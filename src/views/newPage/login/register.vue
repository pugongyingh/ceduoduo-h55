<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="user.phone" type="tel" label="手机号" style="margin-top: 0.4rem" placeholder="请输入手机号码">
      <template #button>
        <!--        <van-button size="small" type="primary">发送验证码</van-button>-->
        <span style="margin-right: 5px" v-if="second < 60">({{second}}s)</span>
        <span style="font-size:0.56rem;color:rgba(221,11,20,1);" @click="sendCaptcha" v-else>发送验证码</span>

      </template>
    </van-field>
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <van-field v-model="user.captcha" type="digit" label="验证码" placeholder="请输入验证码"/>
    <!-- 输入任意文本 -->
    <van-field v-model="user.inviteCode" label="邀请码" placeholder="请输入邀请码">
      <template #button>
        <img src="../../../assets/images/saoyisao-2.png" alt="" style="width: 0.72rem;height: 0.72rem">
      </template>
    </van-field>
    <div class="service">
      <van-checkbox v-model="checked" shape="square"></van-checkbox>
      <span>
       注册即代表同意
      </span>
      <span>
        《册多多服务协议和隐私政策》
      </span>
    </div>

      <div class="next" @click="toSetPassword">
        立即注册
      </div>
  </div>
</template>

<script>
  import {register,sendRegCaptcha,checkCaptcha,checkInviteCode} from "@/services/user";
  import {countDown} from "../../../utils/utils/utils";
  import {loginWithPhoneAndCaptcha} from "../../../services/user";

  export default {
    data() {
      return {
        second:60,
        checked: false,
        user:{
          phone:'',
          captcha:'',
          inviteCode:''
        }
      }
    },
    methods: {
      onSubmit() {
      },
      toSetPassword() {
        if(this.user.phone === '' || this.user.captcha === '' || this.user.inviteCode === '') {
          this.$toast('请输入手机号、验证码以及邀请码')
        } else if(!this.checked) {
          this.$toast('请同意服务和隐私协议')
        } else {
          checkCaptcha({phone:this.user.phone,captcha:this.user.captcha},res => {
            if(res == 200) {
              this.$router.push(`/setPassword?phone=${this.user.phone}&inviteCode=${this.user.inviteCode}`)
            } else {
              this.$toast('验证码错误')
            }
          })
        }
      },
      sendCaptcha() {
          if(this.user.phone === '') {
            this.$toast('请输入手机号')
          } else {
            sendRegCaptcha({phone:this.user.phone},res => {
              if(res === 'success') {
                countDown(60,this,'second')
                this.$toast('发送成功')
              }
            })
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;

    .van-nav-bar .van-icon {
      color: #666666;
    }

    .service {
      /*.van-checkbox /deep/ .van-checkbox__icon {*/
      /*  width: 0.4rem;*/
      /*  height: 0.4rem;*/
      /*}*/
      /*.van-checkbox /deep/ .van-icon-success {*/
      /*  width: 0.4rem;*/
      /*  height: 0.4rem;*/
      /*}*/
      text-align: center;
      .van-checkbox {
        width: 0.8rem;
        display: inline-block;
      }
      .van-checkbox /deep/ .van-checkbox__label {
        font-size: 0.48rem;
      }
      span {
        font-size:0.48rem;
        font-family:PingFang SC;
        font-weight:400;
        position: relative;
        top: -0.24rem;
      }
    }

    .next {
      text-align: center;
      width:13.8rem;
      height:1.6rem;
      background:rgba(221,11,20,1);
      border-radius:0.2rem;
      margin:0.6rem auto;
      font-size:0.72rem;
      font-family:PingFang SC;
      /*font-weight:bold;*/
      line-height: 1.6rem;
      color:rgba(255,255,255,1);
    }
  }
</style>
