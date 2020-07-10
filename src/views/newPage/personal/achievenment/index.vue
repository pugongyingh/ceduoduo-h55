<template>
    <div class="index">
      <div class="navbar">
        <van-nav-bar
          title="我的成绩"
          left-arrow
          @click-left="$router.push('/mine')"
        />
      </div>
      <div class="left">
        <p style="font-size: 30px">0</p>
        <p style="font-size:14px ">余额</p>
      </div>
      <div class="list">
        <van-cell title="业绩统计" is-link @click="$router.push('/inviteDeal')"  />
        <van-cell title="提现申请" is-link @click="$router.push('/getMoney')"  />
        <van-cell title="提现记录" @click="$router.push('/getRecord')" is-link  />
        <van-cell title="注册业绩" is-link  @click="$router.push('/inviteRecord')"  />
        <van-cell title="分享业绩" is-link @click="$router.push('/shareAchievenment')" />
      </div>
      <div class="point">
          <p style="font-size: 30px">100</p>
          <p style="font-size:14px ">点数</p>
      </div>
      <div class="detail">
        <van-cell title="收益明细" is-link  @click="$router.push('/benefit')"/>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less">
  .left {
    width: 100%;
    height: 3.46rem;
    background-color: #FF5F49;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      color: white;
    }
  }

  .point {
    width: 100%;
    height: 3.46rem;
    background-color: #FF5F49;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      color: white;
    }
  }


</style>
