<template>
    <div class="workSetting">
      <van-nav-bar
        title="设置"
        left-arrow
        right-text="完成"
        @click-right="onClickRight"
        @click-left="$router.go(-1)"
      />
      <div class="setBody">
        <div class="limits" @click="show = true">
          <span>谁可以看</span>
          <div class="right">
            <span>{{value}}</span>
            <img src="../../../../assets/newImages/gengduo45.png" alt="">
          </div>
        </div>
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '22%' }">
        <div class="top">
          <div class="open" @click="handleChoose(1)">公开</div>
          <div class="open" @click="handleChoose(2)">私密</div>
        </div>
        <div class="cancel" @click="show = false">
          取消
        </div>
      </van-popup>
    </div>
</template>

<script>
  import {openList,privateList,findAlbumUserShopDTOById} from "../../../../services/album";
  import {Toast} from  'vant'

  export default {
      name: "workSetting",
      data() {
        return {
          id: this.$route.params.id,
          show: false,
          value: '公开'
        };
      },
    mounted() {
      findAlbumUserShopDTOById({id:this.$route.params.id},res => {
          this.value = res.jurisdiction
      })
    },
    methods: {
        onClickRight() {
            if(this.value === '公开') {
              openList({idList:[this.id]},res => {
                Toast('修改成功')
              })
            } else {
              privateList({idList: [this.id]},res => {
                Toast('修改成功')
              })
            }
        },
        handleChoose(val) {
          if (val === 1) {
            this.value = '公开'
          } else {
            this.value = '私密'
          }

          this.show = false
        }
      }
    }
</script>

<style lang="less" scoped>
.workSetting {
  .setBody {
    display: flex;
    justify-content: center;
    .limits {
      display: flex;
      justify-content: space-between;
      margin-top: 0.74rem;
      width:13.8rem;
      height:1.76rem;
      background:rgba(255,255,255,1);
      border-radius:0.4rem;
      >span {
        display: -webkit-box;
        display: -moz-box;
        -moz-box-align: center;
        -webkit-box-align: center;
        margin-left: 0.5rem;
        font-size:0.56rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:0.9rem;
      }
      .right {
        display: -webkit-box;
        display: -moz-box;
        -moz-box-align: center;
        -webkit-box-align: center;
        span {
          margin-right: 0.64rem;
          font-size:0.56rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(153,153,153,1);
        }
        img {
          vertical-align: center;
          margin-right: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
  .van-popup--bottom {
    .top {
      .open {
        display: flex;
        justify-content: center;
        align-items: center;
        height:2rem;
        font-size:0.58rem;
        font-family:PingFang;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:0.94rem;
      }

    }
    .cancel {
      height:2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background:rgba(237,237,237,1);
      font-size:0.58rem;
      font-family:PingFang;
      font-weight:500;
      color:rgba(48,47,47,1);
      line-height:0.94rem;
    }
  }
}
</style>
