<template>
    <div class="bindNewPhone">
      <div class="binding" v-if="!binded">
        <div class="navbar">
          <van-nav-bar
            :title="!isbindNewPhone? '绑定手机号':'验证手机号'"
            left-arrow
            :right-text="!isbindNewPhone? '下一步':'完成'"
            @click-right="nextStep"
            @click-left="$router.go(-1)"
          />
        </div>
        <van-field v-model="isbindNewPhone? newtel:oldtel" type="tel" :label="!isbindNewPhone? '原手机号':'新手机号'" style="margin-top: 0.4rem" :placeholder="isbindNewPhone? '请输入新手机号码':'请输入原手机号码'">
          <template #button>
            <span style="margin-right: 5px">(53s)</span>
            <span style="font-size:0.56rem;color:rgba(221,11,20,1);" @click="sendCheckCaptcha">发送验证码</span>
          </template>
        </van-field>
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <van-field v-model="isbindNewPhone? newcaptcha:captcha" type="digit" label="验证码" placeholder="请输入验证码"/>
      </div>

      <div class="binded" v-if="binded">
        <div class="navbar">
          <van-nav-bar
            title="绑定手机号"
            left-arrow
            @click-left="$router.go(-1)"
          />
        </div>
        <div class="binded-content">
          <img src="../../../../assets/images/bind-success.png" alt="">
          <p>已更改绑定手机号</p>
        </div>
      </div>

    </div>
</template>

<script>
  import {sendBindCaptcha,checkCaptcha,updatePhone} from "../../../../services/user";

  export default {
        name: "bindNewPhone",
      data() {
          return {
            oldtel:'',
            captcha:'',
            isbindNewPhone:false,
            isSuccess:false,
            binded:false,
            newtel:'',
            newcaptcha:''
          }
      },
      methods:{
          nextStep() {
            // if(!this.isbindNewPhone) {
            //   this.isbindNewPhone = true
            // } else {
            //   this.binded = true
            // }
            checkCaptcha({
              phone:this.isbindNewPhone? this.newtel:this.oldtel,
              captcha:this.isbindNewPhone? this.newcaptcha:this.captcha
            },(res) => {
              if(res === '200') {
                if(!this.isbindNewPhone) {
                  this.isbindNewPhone = true
                } else {
                  updatePhone({
                    phone:this.oldtel
                  },res => {
                    if(res) {
                      this.$toast('修改成功')
                      this.$router.push('/userInfo')
                    }
                  })
                }
              }
            })
        },
        sendCheckCaptcha() {
            sendBindCaptcha({phone:this.oldtel},res => {
              if(res) {
                this.$toast('发送成功')
              }
            })
        }
      }
    }
</script>

<style lang="less" scoped>
  .binded-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    p {
      margin-top: 10px;
      font-size: 15px;
    }
  }
</style>
