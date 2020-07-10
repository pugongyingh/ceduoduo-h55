<template>
  <div class="chooseTemplate">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">作品名称</div>
      <span class="btn" @click="complete">完成</span>
    </div>
    <van-field v-model="value" placeholder="请输入作品名称" style="margin-top: 0.4rem;"/>
  </div>
</template>

<script>
	export default {
		name: "saveWork",
		data() {
			return {
			  value: ''
      }
		},
		methods: {
		  //完成
      complete() {
        alert('保存成功')
      }
    }
	}

</script>

<style scoped lang="less">
  .chooseTemplate {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .top {
      border-bottom: 1px solid #E6E6E6;
      /*width: 15rem;*/
      height: 2rem;
      line-height: 2rem;
      position: relative;
      .nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.72rem;
        font-family:PingFang;
        font-weight:bold;
      }
      .fanhui {
        position: absolute;
        left: 0.68rem;
        top: 0.6rem;
        width: 0.4rem;
        height: 0.78rem;
      }
      .btn {
        float: right;
        color: #333333;
        font-size: 0.65rem;
        margin-right: 0.5rem;
      }
    }
  }
</style>
