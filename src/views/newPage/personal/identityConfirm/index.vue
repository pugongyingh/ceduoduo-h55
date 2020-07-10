<template>
    <div class="identityConfirm">
      <!--      导航栏-->
      <div class="navbar">
        <van-nav-bar
          title="实名认证"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>

<!--      表单-->
      <div class="form">
        <van-cell title="真实姓名" is-link value="紫小鲸" @click="$router.push('/editIdentity?type=name')" />
        <van-cell title="身份证号码" is-link value="4444444444444444444444444" @click="$router.push('/editIdentity?type=idcode')" />
        <van-cell title="联系电话" is-link value="1424231231" @click="$router.push('/editIdentity?type=phone')" />
        <van-cell style="margin-top: 0.4rem;" center is-link title="店铺所在地区" value="请选择" label="请输入详细地址信息，如街道、楼牌号等（5-120个字）" @click="$router.push('/editIdentity?type=address')" />
      </div>

<!--      上传身份证照片-->
      <div class="certification">
        <div class="tip">
          <p class="first-p" style="font-size: 0.72rem;">温馨提示</p>
          <p style="font-size: 0.6rem">为保障您的权益,请上传本人身份证照片审核</p>
        </div>
        <div class="uploadImgForm">
          <div>
            <van-uploader preview-image :after-read="afterRead" />
            <p>身份证正面</p>
          </div>
          <div>
            <van-uploader :after-read="afterRead" />
            <p>身份证反面</p>
          </div>
          <div>
            <van-uploader :after-read="afterRead" />
            <p>手持证件照</p>
          </div>
          <div>
            <van-uploader :after-read="afterRead" />
            <p>证件执照</p>
          </div>
        </div>
      </div>

<!--      提交-->
      <div class="submitButton">
        提交审核
      </div>
    </div>
</template>

<script>
    export default {
        name: "identityConfirm",
      data() {
          return {

          }
      },
      methods:{
          afterRead(file) {
            console.log(file)
          }
      }
    }
</script>

<style scoped lang="less">
  .tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.4rem;
    p {
      margin-top: 0.2rem;
    }
    .first-p {
      color: #ED001A;
    }
  }

  .uploadImgForm {
    display: flex;
    flex-wrap: wrap;
    div {
      flex: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    p {
      font-size: 10px;
    }
  }

  .submitButton {
    margin: 0 auto;
    margin-top: 0.6rem;
    width: 8rem;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    background: #ED001A;
    font-size: 10px;
    color: #fff;
  }
</style>
