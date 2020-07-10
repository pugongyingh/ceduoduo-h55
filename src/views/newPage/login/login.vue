<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-arrow
    />
    <div class="logo">
      <img src="../../../assets/images/ceshi.jpg" alt="">
    </div>
      <div v-if="loginWay === 'phone'">
        <van-field
          v-model="username"
          name="手机号"
          label="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>

      <div v-if="loginWay === 'code'">
        <van-field v-if="loginWay === 'code'" v-model="username" type="tel" label="手机号" style="margin-top: 0.4rem" placeholder="请输入手机号码">
          <template #button v-if="loginWay === 'code'">
            <!--        <van-button size="small" type="primary">发送验证码</van-button>-->
            <span style="margin-right: 5px" v-if="second < 60">{{second}}</span>
            <span style="font-size:0.56rem;color:rgba(221,11,20,1);" @click="sendCaptcha" v-else>发送验证码</span>

          </template>
        </van-field>
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <van-field v-model="captcha" type="digit" label="验证码" placeholder="请输入验证码"/>
      </div>

      <div style="margin-top: 1.4rem;margin-bottom: 2.4rem" v-on:click="toLogin">
        <van-button round block type="info" >
          登录
        </van-button>
      </div>

      <div class="forgetAndRegister">
      <span class="forget" @click="$router.push('/password')">忘记密码</span>
      <span class="forget" @click="loginWay = 'phone'" v-if="loginWay === 'code'">密码登录</span>
      <span class="forget" @click="loginWay = 'code'" v-if="loginWay === 'phone'">验证码登录</span>
      <span class="register" @click="$router.push('/userRegister')">立即注册</span>
    </div>
      <div class="otherLoginWays">
      <div class="item">
        <img src="../../../assets/images/ceshi.jpg" alt="">
        <p>微信</p>
      </div>
      <div class="item">
        <img src="../../../assets/images/ceshi.jpg" alt="">
        <p>QQ</p>
      </div>
      <div class="item">
        <img src="../../../assets/images/ceshi.jpg" alt="">
        <p>微博</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginWithPhoneAndCaptcha, loginWithPhoneAndPassword, sendLoginCaptcha,loginPassword} from "../../../services/user";
  import {countDown} from "../../../utils/utils/utils";

  export default {
    data() {
      return {
        second:60,
        activeIndex:2,
        navList:['首页','宝贝','付款方式'],
        show:false,
        username:'',
        password:'',
        captcha:'',
        loginWay:'code' // phone 密码登录 code 验证码登录
      }
    },
    methods:{
      toSetPassword() {
        this.$router.push('/userLogin/setPassword')
      },
      toLogin() {
        if(this.loginWay === 'phone') {
          loginPassword({
            phone:this.username,
            password:this.password
          },res => {
            if(res) {
              this.$toast('登陆成功')
              console.log(res)
              let user = {};
              user.id = res.id;
              user.token = res.token;
              this.$store.commit('SELECT_SHOP', {
                user: user,
              });
              localStorage.setItem('userMsg',JSON.stringify(res))
              this.$router.push('/shopBaby')
            }
          })
        } else {
          loginWithPhoneAndCaptcha({
            phone:this.username,
            captcha:this.captcha
          },res => {
            if(res) {
              this.$toast('登陆成功')
              localStorage.setItem('userMsg',JSON.stringify(res))
              this.$store.commit('saveUser')
              this.$router.push('/shopBaby')
            }
          })
        }
      },
      sendCaptcha() {
        if(!this.username) {
          this.$toast('请输入手机号')
        } else {
          sendLoginCaptcha({
            phone:this.username
          },res => {
              if(res === 'success') {
                countDown(60,this,'second')
                this.$toast('已发送')
              }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .van-nav-bar .van-icon {
      color:#666666;
    }
    .logo {
      width: 4rem;
      height: 3.2rem;
      background:rgba(216,245,253,1);
      border-radius:0.2rem;
      overflow: hidden;
      margin: 2rem auto 1.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .van-cell{
      width: 13.8rem;
      margin: auto;
    }
    .van-button {
      width: 8rem;
      height: 1.8rem;
      margin: auto;
      background-color: #DD0B14;
      border-color: #DD0B14;
    }
    .forgetAndRegister {
      width: 12rem;
      overflow: hidden;
      margin:auto;
      display: flex;
      justify-content: space-between;
      .forget {
        font-size:0.48rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        /*float: left;*/
      }
      .register {
        font-size:0.48rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(221,11,20,1);
        /*float: right;*/
      }
    }
    .otherLoginWays {
      width: 10.6rem;
      margin: 2.8rem auto 0;
      display: flex;
      justify-content: space-between;
      .item {
        width: 1.8rem;
        text-align: center;
        img {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
        }
        p {
          font-size:0.48rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(153,153,153,1);
          line-height:0.8rem;
          text-align: center;
        }
      }
    }
  }
</style>
