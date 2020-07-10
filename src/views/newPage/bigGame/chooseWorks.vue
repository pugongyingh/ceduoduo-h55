<template>
    <div class="chooseWorks">
      <van-nav-bar
        title="选择作品"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="handleChoose"
      />
      <div class="worksBody">
        <div class="imgList" v-for="(item, index) in albumData" :key='index' @click="handlePick(item)">
          <div class="inner">
            <img :src="item.cover" alt="">
            <span :class='{isPrivate: item.jurisdiction === "私密"}'>{{item.jurisdiction === '私密' ? '私密' : '公开'}}</span>
            <div class='startBtn'>
              <img src="../../../assets/images/播放.png" alt="">
            </div>
          </div>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import { Dialog } from 'vant';
  import { findMyAlbum } from '@/services/album'
  import { saveByContestIdAndStoreIdAndAlbumIdWithUserId } from '@/services/contestAlbum'
    export default {
      name: "chooseWorks",
      data () {
        return {
          albumData: []
        }
      },
      methods: {
        // 获取我的作品
        getMyAlbum() {
          findMyAlbum({
            pageable: {
              page: this.page,
              size: this.size,
              sort: {desc: ['id']}
            }
          }, res => {
            this.albumData = res
          })
        },
        handleChoose() {},
        // 选中弹出框
        handlePick(item) {
          // 私密作品，提示框
          Dialog.confirm({
            title: item.jurisdiction === '私密' ? '该相册为私密相册' : '该相册为公开相册',
            message: item.jurisdiction === '私密' ? 
            `选择参赛后将会修改状态 为公开确认选择 “${item.name}” 为参赛作品吗？` : 
            `确定选择“${item.name}”为参赛作品吗？`,
            confirmButtonColor: '#ED001A'
          })
          .then(() => {
            // 确认用该私密作品参加比赛
            saveByContestIdAndStoreIdAndAlbumIdWithUserId({
              storeId: this.storeId,
              contestId: this.contestId,
              albumId: item.id
            }, res => {
              this.$router.push({path: '/bigGame/' + this.contestId})
            })
          })
          .catch(() => {
            this.$toast('已取消操作')
          });
        },
      },
      created() {
        this.getMyAlbum()
        this.storeId = this.$route.query.storeId
        this.contestId = this.$route.query.contestId
      }
    }
</script>

<style lang="less" scoped>
.chooseWorks {
  .van-nav-bar {
    /deep/.van-nav-bar__title {
      font-size: 0.72rem;
      font-family: PingFang;
      font-weight: bold;
      color: rgba(51,51,51,1);
    }
    /deep/.van-icon {
      color: rgba(51,51,51,1);
    }
    /deep/.van-nav-bar__text {
      color: rgba(51,51,51,1);
    }
  }
  .worksBody {
    display: flex;
    flex-wrap: wrap;
    padding: 0.3rem 0;
    .imgList {
      width: 4.2rem;
      margin-top: 0.46rem;
      display: flex;
      flex: 0 0 33.33%;
      box-sizing: border-box;
      flex-direction: column;
      align-items: center;
      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        margin-top: 0;
      }
      .inner{
        position: relative;
        width:4.2rem;
        height:5.6rem;
        span {
          position: absolute;
          left: 0;
          top: -0.3rem;
          display: inline-block;
          text-align: center;
          width: 1.32rem;
          height: 0.68rem;
          line-height:0.68rem;
          background:rgba(221,11,20,1);
          border-radius:10px 0;
          font-size:0.4rem;
          color:rgba(255,255,255,1);
          &.isPrivate {
           background: rgba(248,178,58,1);
          }
        }
        img {
          width:4.2rem;
          height:5.6rem;
          border-radius: 10px;
          box-shadow: 0.0125rem 0 0.1rem 0rem rgba(0, 0, 0, 0.2);
        }
        .startBtn {
          width: 1.02rem;
          height: 1.02rem;
          position: absolute;
          bottom: 0.12rem;
          right: 0.12rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      span {
        display: inline-block;
        margin-top: 0.32rem;
        height:0.5rem;
        font-size:0.52rem;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.5rem;
      }
    }
  }
}
</style>
