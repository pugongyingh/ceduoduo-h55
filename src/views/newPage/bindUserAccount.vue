<template>
  <div class="bindAccount">
    <van-nav-bar
      title="绑定账号"
      left-arrow
    />
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="tel" type="tel" label="手机号" style="margin-top: 0.4rem" placeholder="请输入手机号码">
      <template #button>
        <!--        <van-button size="small" type="primary">发送验证码</van-button>-->
        <span style="margin-right: 5px">(53s)</span><span
        style="font-size:0.56rem;color:rgba(221,11,20,1);">发送验证码</span>

      </template>
    </van-field>
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <van-field v-model="securityCode" type="digit" label="验证码" placeholder="请输入验证码"/>
    <!-- 输入任意文本 -->
    <van-field v-model="InvitationCode" label="邀请码" placeholder="请输入邀请码">
<!--      <template #button>-->
<!--        <img src="../../assets/images/saoyisao-2.png" alt="" style="width: 0.72rem;height: 0.72rem">-->
<!--      </template>-->
    </van-field>
    <div class="next">
      完成
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tel: '',
        securityCode: '',
        InvitationCode: '',
        checked: ''
      }
    },
    methods: {
      onSubmit() {
      }
    }
  }
</script>

<style lang="less" scoped>
  .bindAccount {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;

    .van-nav-bar .van-icon {
      color: #666666;
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
