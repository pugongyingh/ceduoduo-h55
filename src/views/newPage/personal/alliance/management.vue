<template>
  <div class="create">
    <div class="navbar">
      <van-nav-bar
        title="商家联盟名称"
        left-arrow
        @click-left="$router.push('/alliance')"
      >
      </van-nav-bar>
    </div>
    <van-cell title="联盟头像" is-link value="选择头像" @click="uploadAvatar" />
    <van-cell title="联盟名称" is-link :value="name" />

    <div class="preview">
      <img src="../../../../assets/images/ceshi.jpg" alt="">
    </div>

    <div class="button">
      下一步
    </div>

    <van-action-sheet
      v-model="uploadMethod"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"/>
  </div>
</template>

<script>
  export default {
    name: "createAllience",
    data() {
      return {
        name:'',
        uploadMethod:false,
        actions:[{
          name:'系统头像'
        },{
          name:'自定义头像'
        }],
      }
    },
    methods:{
      uploadAvatar() {
        this.uploadMethod = true
      }
    }
  }
</script>

<style scoped lang="less">
  .button {
    margin: 0.6rem auto;
    width: 6rem;
    height: 1.8rem;
    border-radius: 4px;
    text-align: center;
    font-size: 15px;
    color: white;
    line-height: 1.8rem;
    background: #ED001A;
  }

  .preview  {
    margin: 0.4rem auto;
    width: 4rem;
    height: 4rem;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
</style>
