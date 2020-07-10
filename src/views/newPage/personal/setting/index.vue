<template>
    <div class="index">
      <van-nav-bar
        title="设置"
        left-arrow
        @click-left="$router.push('/mine')"
      />
      <div class="form">
        <van-cell title="关于我们" is-link @click="$router.push('/article?type=aboutUs')"  />
        <van-cell title="帮助中心" is-link @click="$router.push('/helpCenter')"  />
        <van-cell title="意见反馈" is-link @click="$router.push('/advice')"  />
        <van-cell title="隐私政策" is-link @click="$router.push('/article?type=privacy')"  />
        <van-cell title="用户协议" is-link @click="$router.push('/article?type=agreement')"  />
        <van-cell title="检查更新" is-link @click="$router.push('/update')"  />
      </div>

      <div class="logoutButton" @click="logout">
        退出登录
      </div>
    </div>
</template>

<script>
  import {logout} from "../../../../services/user";
  import { Dialog } from 'vant';

  export default {
        name: "index",
      methods:{
          logout() {
            Dialog.confirm({
              title: '退出',
              message: '确定退出登录?',
            })
              .then(() => {
                logout({},res => {
                  localStorage.clear()
                  this.$router.push('/userLogin')
                })
              })
              .catch(() => {

              });
          }
      }
    }
</script>

<style scoped lang="less">
  .logoutButton {
    height: 1.6rem;
    width: 100%;
    margin-top: 7.6rem;
    line-height: 1.6rem;
    text-align: center;
    background-color: #fff;
    font-size:0.68rem ;
    color: #ED001A;
  }
</style>
