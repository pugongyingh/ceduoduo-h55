<template>
    <div class="share">
      <div class="navbar">
        <van-nav-bar
          title="我的团队"
          left-arrow
          @click-left="$router.push('/achievenment')"
        />
      </div>
      <div class="list">
        <p>B级合伙人</p>
        <div class="b-level">
          <div v-for="i in 3">
            <div class="avatar">
              <img src="../../../../assets/images/ceshi.jpg" alt="">
            </div>
            <div class="name">
              用户
            </div>
          </div>
        </div>

        <p>C级合伙人</p>
        <div class="c-level">
          <div v-for="i in 3">
            <div class="avatar">
              <img src="../../../../assets/images/ceshi.jpg" alt="">
            </div>
            <div class="name">
              用户
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "shareAchievenment"
    }
</script>

<style lang="less" scoped>
  .list {
    padding: 0.6rem 0.6rem;
    p {
      font-size: 15px;
      padding: 2px 0;
    }
  }

  .b-level,.c-level{
    width: 13.8rem;
    div {
      background-color: #fff;
      display: flex;
      border-bottom: 1px solid #E6E6E6;
      width: 100%;
      height: 2.4rem;
      .avatar {
        width: 2.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: 1.6rem;
          height: 1.6rem;
          border-radius:5px ;
        }
      }
      .name {
        line-height: 2.4rem;
        text-indent: 0.3rem;
        font-family: PingFang-SC-Medium;
        font-size: 15px;
      }
    }
  }



</style>
