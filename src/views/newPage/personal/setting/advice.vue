<template>
  <div class="about">
    <van-nav-bar
      :title="$t('m.personal.advice')"
      left-arrow
      right-text="提交"
      @click-left="onClickLeft"
      @click-right="submit"
    />
    <van-cell-group>
      <van-field
        v-model="message"
        rows="6"
        autosize
        type="textarea"
        maxlength="132"
        placeholder="请输入反馈"
        show-word-limit
      />
    </van-cell-group>

  </div>
</template>

<script>
  import '../../../../assets/css/topNav.css'
  import {post} from "@/utils/request/index.js"
  import {save} from "../../../../services/advice";

  export default {
    name:'advice',
    data() {
      return{
        message:''
      }
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
      // 提交反馈
      submit() {
        if(this.message.trim().length === 0){
          this.$toast('请输入反馈内容！');
          return false;
        }
        save({advice:{content:this.message}},res => {
            this.message='';
            this.$toast('提交成功');
            this.$router.go(-1);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .about {
    height: 100vh;
    background-color: #f5f5f5;
    .submit {
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      width: 10.04rem;
      font-size: 0.72rem;
      color: #885022;
      background-image: url("../../../../assets/images/b_btn_search.png");
      background-size: 100% 100%;
      background-attachment: fixed;
      background-repeat: no-repeat;
      position: relative;
      left: 50%;
      top: 1.6rem;
      transform: translateX(-50%);
    }
  }
</style>
