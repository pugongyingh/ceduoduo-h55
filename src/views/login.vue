<template>
  <div class="login">
    <!--      <header-top :title="title"></header-top>-->
    <van-nav-bar :title="$t('m.login')" />
    <div class="logo">
      <!--        <img src="@/assets/images/bless.jpg" alt="">-->
      <img src="../assets/images/bless.jpg" alt="">
    </div>
    <div class="form">
      <van-cell-group>
        <van-field v-model="formValidate.phone" clearable placeholder="请输入手机号" type="tel">
          <template slot="left-icon">
            <div class="tip">
              <span>+{{areaCode+area}}</span>
              <van-icon :name="arrow" />
            </div>
          </template>
        </van-field>
        <van-field v-if="visible" v-model="formValidate.password" type="password" placeholder="请输入密码" @click-right-icon="visible=false" right-icon="closed-eye">
          <template slot="left-icon">
            <div class="tip">
              <span>密码</span>
            </div>
          </template>
        </van-field>
        <van-field v-else v-model="formValidate.password" type="text" right-icon="eye-o" placeholder="请输入密码" @click-right-icon="visible = true">
          <template slot="left-icon">
            <div class="tip">
              <span>密码</span>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <div class="select" @click="selectAreaCode">
      </div>
      <!--      <div class="select">-->
      <!--        <van-radio-group v-model="radio" class="radio-group">-->
      <!--          <van-cell-group>-->
      <!--            <van-cell title="+86" clickable @click="radio = '1'">-->
      <!--              <van-radio slot="right-icon" name="1" />-->
      <!--            </van-cell>-->
      <!--            <van-cell title="+886" clickable @click="radio = '2'">-->
      <!--              <van-radio slot="right-icon" name="2" />-->
      <!--            </van-cell>-->
      <!--          </van-cell-group>-->
      <!--        </van-radio-group>-->
      <!--      </div>-->
    </div>
    <div class="submit" @click="onSubmit(formValidate)">
      登录
    </div>

    <div class="footer">
      <div class="forget" @click="onForget">忘记密码</div>
      <div class="register" @click="onRegister">免费注册</div>
    </div>

    <div class="other">
      <van-divider :style="{ color: '#999999', borderColor: '#999999' }">
        其他登录方式
      </van-divider>
      <div class="loginWay">
        <div @click="otherLogin('微信')">
          <img src="../assets/images/a_ic_1.png" alt="">
          <p>微信</p>
        </div>
        <div @click="otherLogin('LINE')">
          <img src="../assets/images/a_ic_2.png" alt="">
          <p>LINE</p>
        </div>
        <div @click="otherLogin('Facebook')">
          <img src="../assets/images/a_ic_3.png" alt="">
          <p>Facebook</p>
        </div>
        <div @click="otherLogin('Google')">
          <img src="../assets/images/a_ic_4.png" alt="">
          <p>Google</p>
        </div>
      </div>
    </div>

<!--        <div style="position:fixed;top: 10%;width: 90%;height: 50%;background-color: pink">-->
<!--          {{ info }}-->
<!--        </div>-->
  </div>
</template>

<script>
import { post } from '@/utils/request/index';
import { Toast } from 'vant';
import '../assets/css/topNav.css';

export default {
  name: 'login',
  data() {
    return {
      title: '登录',
      formValidate: {
        errors: [],
        phone: '',
        password: '',
      },
      visible: true,
      arrow: 'arrow-down',
      areaCode: '86',
      // 用户授权码
      userCode: '',
      info: {},
      loginCount:1,
      area:'中国'
      // radio:'1'
    };
  },
  mounted() {
    if(this.$route.query.templeId){
      window.localStorage.setItem('templeId',JSON.stringify(this.$route.query.templeId));
    }
    if(window.sessionStorage.getItem('loginCount')){
      this.loginCount = JSON.parse(window.sessionStorage.getItem('loginCount'));
    }
    let ls = localStorage.getItem('userMsg');
    if (ls) {
      this.$router.push({ path: '/temp' });
    }
    if (window.sessionStorage.getItem('paySuccess')) {
      window.sessionStorage.removeItem('paySuccess');
    }
    if (window.sessionStorage.getItem('writeSuccess')) {
      window.sessionStorage.removeItem('writeSuccess');
    }
    if (this.$route.query.areaCode) {
      this.areaCode = this.$route.query.areaCode + '';
      console.log(this.areaCode);
      if(this.areaCode === '86'){
        this.area = '中国';
      }
      if(this.areaCode === '886'){
        this.area = '台湾';
      }
    }
    if (location.href.indexOf('code') !== -1 && this.loginCount === 1) {
      this.userCode = this.getvar(location.href, 'code');
      // this.info = this.userCode;
      // post('api/user/getCode',{
      //   "code": this.userCode
      // },res => {
      //   console.log(res);
      // })
      // this.$toast(this.userCode);
      // location.href = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf7cda5610536583c&secret=T7cdhf8lb9h72115BRjYrUsaGapwQ9Go&code='+this.userCode+'&grant_type=authorization_code';
      // this.$toast(res);
      post(
        'api/user/getWechatOpenId',
        {
          code: this.userCode
        },
        res1 => {
          // console.log(res1.data.data);
          if(res1.data.code === 200){
            post('api/user/loginWithOpenId',{openId:JSON.parse(res1.data.data).openid},res2 => {
              // this.info = res2;
              if(res2.data.code === 200){
                // this.$router.push({path:'bindAccount',query:{openId:res1.data.data}});
                Toast('登录成功');
                this.loginCount = 2;
                window.sessionStorage.setItem('loginCount',JSON.stringify(this.loginCount));
                let user = {};
                user.id = res2.data.data.id;
                user.token = res2.data.data.token;
                this.$store.commit('SELECT_SHOP', {
                  user: user
                });
                console.log(user);
                localStorage.setItem('userMsg', JSON.stringify(user));
                // localStorage.setItem('userToken',user.token);
                setTimeout(() => {
                  this.$router.push({ path: '/temp' });
                }, 1000);
              }else if(res2.data.code === 400 && res2.data.message === '该微信号未注册') {
                this.loginCount = 2;
                // this.$toast(JSON.parse(res1.data.data).access_token);
                window.sessionStorage.setItem('loginCount',JSON.stringify(this.loginCount));
                this.$router.push({path: "/person-detail",query:{origin:'weiXin',access_token:JSON.parse(res1.data.data).access_token,openid:JSON.parse(res1.data.data).openid}});
              }else {
                Toast(res2.data.message);
              }
            });
            // post('api/user/getUserInfo',{code: this.userCode},res3 => {
            //   console.log(res3);
            // })
          }else {
            this.$toast('登录失败');
          }
        }
      );
    }
    // localStorage.removeItem('userMsg');
  },
  methods: {
    getvar(url, par) {
      let urlsearch = url.split('?');
      let pstr = urlsearch[1].split('&');
      for (let i = pstr.length - 1; i >= 0; i--) {
        let tep = pstr[i].split('=');
        if (tep[0] === par) {
          return tep[1];
        }
      }
      return -1;
    },
    // 选择区号
    selectAreaCode() {
      // console.log(1);
      this.$router.push({
        path: '/chooseAreaCode',
        query: { origin: 'login' },
      });
      // console.log(2);
      // this.$router.go(-1)
    },
    onSubmit(formValidate) {
      let regExpChina = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      let regExpTw = /^09\d{8}$/;
      if (formValidate.phone === '') {
        this.$toast('手机号不能为空！');
        return false;
      }
      if(this.areaCode === '86'){
        if(!regExpChina.test(formValidate.phone)){
          this.$toast('输入的手机号码有误！');
          return false;
        }
      }
      if(this.areaCode === '886'){
        if(!regExpTw.test(formValidate.phone)){
          this.$toast('输入的手机号码有误！');
          return false;
        }
      }
      if (formValidate.password === '') {
        this.$toast('密码不能为空！');
        return false;
      } else {
        // this.$router.push({path:'/home'});
        this.login();
      }
    },
    onRegister() {
      this.$router.push({ path: '/register' });
    },
    onForget() {
      let regExpChina = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      let regExpTw = /^09\d{8}$/;
      if(this.formValidate.phone.trim().length === 0){
        this.$toast('请先输入您的手机号');
        return false;
      }
      if(this.areaCode === '86'){
        if(!regExpChina.test(this.formValidate.phone)){
          this.$toast('您输入的手机号有误！');
          return false;
        }
      }
      if(this.areaCode === '886'){
        if(!regExpTw.test(this.formValidate.phone)){
          this.$toast('您输入的手机号有误！');
          return false;
        }
      }
      this.$router.push({ path: '/forget',query:{phone:this.formValidate.phone}});
    },
    login() {
      post(
        'api/user/loginWithPhoneAndPassword',
        {
          cellphone: this.formValidate.phone,
          password: this.formValidate.password,
        },
        (res) => {
          console.log(res);
          if (res.data.code == '200') {
            Toast('登录成功');
            console.log(res);
            let user = {};
            user.id = res.data.data.id;
            user.token = res.data.data.token;
            this.$store.commit('SELECT_SHOP', {
              user: user,
            });
            console.log(user);
            localStorage.setItem('userMsg', JSON.stringify(user));
            // localStorage.setItem('userToken',user.token);
            setTimeout(() => {
              this.$router.push({ path: '/temp' });
            }, 1000);
          } else {
            Toast(res.data.message);
          }
        }
      );
    },
    // 其他登录方式
    otherLogin(type) {
      if (type === '微信') {
        let browserInfo = navigator.userAgent.toLowerCase();
        console.log(browserInfo);
        //在微信浏览器中打开
        if (browserInfo.match(/MicroMessenger/i) == 'micromessenger') {
          // this.$toast('weixin');
          this.loginCount = 1 ;
          window.sessionStorage.setItem('loginCount',JSON.stringify(this.loginCount));
          location.href =
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf7cda5610536583c&redirect_uri=https%3A%2F%2Fwenxuanguangmingdeng.com%2Fh5%2F%23%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        } else {
          this.$toast('您使用的浏览器暂不支持微信登录，请前往微信内打开');
        }
      }else {
        this.$toast('暂未开放该登录方式，敬请期待');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;

  .logo {
    /*text-align: center;*/
    /*margin-top: 2.5rem;*/
    margin-bottom: 0.5rem;
    width: 100%;
    height: 8rem;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .form {
    position: relative;
    /*.radio-group {*/
    /*  width: 30%;*/
    /*  position: absolute;*/
    /*  !*left: 0;*!*/
    /*  top: 44px;*/
    /*  z-index: 1;*/
    /*}*/
    padding: 0 0.8rem;

    .tip {
      width: 4rem;
      z-index: 999;
    }

    .van-icon {
      display: inline-block;
      vertical-align: bottom;
    }

    .select {
      width: 4rem;
      height: 44px;
      background-color: transparent;
      position: absolute;
      top: 0;
    }
  }

  .submit {
    background-image: url('../assets/images/b_btn_pay.png');
    width: 13.08rem;
    height: 2rem;
    border-radius: 0.2rem;
    background-size: cover;
    line-height: 2rem;
    text-align: center;
    font-size: 0.72rem;
    color: #885022ff;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.72rem;
  }

  .footer {
    overflow: hidden;
    width: 13.08rem;
    font-size: 0.56rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.6rem;
    color: #885022ff;

    .forget {
      float: left;
    }

    .register {
      float: right;
    }
  }

  .form /deep/ .van-field__control {
    padding-left: 0.4rem;
  }

  .other {
    /*height: 2rem;*/
    width: 11.72rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    /*background-color: #00B1E4;*/
    margin-top: 2.44rem;

    .loginWay {
      display: flex;

      div {
        flex: 1;
        text-align: center;

        p {
          font-size: 0.48rem;
          color: #666666;
        }

        img {
          width: 1.36rem;
          height: 1.36rem;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>
