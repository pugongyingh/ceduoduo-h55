<template>
    <div class="detail">
      <div class="navbar">
        <van-nav-bar
          title="商家联盟详情"
          left-arrow
          :right-text="type === 'other'? '加入':''"
          @click-left="$router.go(-1)"
          @click-right="toJoin"
          border
        />
      </div>

      <div class="top">
        <div class="left">
          <img :src="allianceDetail.avatar" alt="">
        </div>
        <div class="right">
          <div class="manageButton" v-if="type === 'mine'" @click="toManage">
            管理
          </div>
          <p style="font-size: 14px;margin-top: 0.64rem">{{allianceDetail.name}}</p>
          <p style="font-size: 12px;margin-top: 0.52rem">
            <span>总人数：{{allianceDetail.quantity}}</span>
            <span style="float:right">创建时间：{{allianceDetail.updateAt}}</span>
          </p>
        </div>
      </div>

      <div class="creator">
        创建人
      </div>

      <div class="item">
        <img :src="allianceDetail.avatar" alt="">
        <span>{{allianceDetail.userName}}</span>
      </div>

      <div class="creator">
        成员
      </div>

      <div class="item" v-for="item in allianceMember">
        <img :src="item.avatar" alt="">
        <span>{{item.nickname}}</span>
      </div>
    </div>
</template>

<script>
  import { allianceFindDetailById,addUserList } from '@/services/alliance.js'
  import { userFindByJoinedAlliance } from '@/services/user.js'
    export default {
        name: "allianceDetail",
      data() {
          return {
            allianceDetail: [],
            allianceMember: [],
          }
      },
      computed:{
          type() {
            return this.$route.query.type
          },
          id() {
            return this.$route.query.id
          },
          userId() {
            return JSON.parse(localStorage.getItem('userMsg')).id
          }
      },
      mounted() {
          this.getMsg()
      },
      methods: {
          // 加入联盟
        toJoin() {
          let param = {
            "allianceId": this.id,
            "userIdList": [this.userId]
          }
          addUserList(param, res=>{
            this.$router.push('/alliance')
          })
        },
        toManage() {
          this.$router.push('/manageAllience?id='+this.id)
        },
        getMsg() {
          let param = {
            id: this.id
          }
          allianceFindDetailById(param, res=>{
            this.allianceDetail = res
          })
          let param2 = {
            alliance: {id: this.id},
            pageable: {page: 1, size: 10, sort: {desc: ["id"]}}
          }
          // 商家联盟成员
          userFindByJoinedAlliance(param2, res=>{
            this.allianceMember = res
          })
        }
      }
    }
</script>

<style scoped lang="less">
  .top {
    border-top: 1px solid #eee;
    width: 100%;
    height: 3.2rem;
    display: flex;
    background-color: #fff;
    .left {
      width: 3rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 4px;
      }
    }
    .right {
      position: relative;
      .manageButton {
        position: absolute;
        width: 2.4rem;
        height: 0.84rem;
        border-radius: 4px;
        background-color: #ED001A;
        font-size: 12px;
        color: white;
        text-align: center;
        line-height: 0.84rem;
        top: 0.8rem;
        right: 0.66rem;
      }
      width: calc(100% - 3rem);
      height: 100%;
      padding-right: 0.66rem;
      box-sizing: border-box;
    }
  }

  .creator {
    width: 100%;
    height: 1.6rem;
    line-height: 1.6rem;
    padding-left: 0.64rem;
    font-size: 11px;
    color: #909699;
  }

  .item {
    width: 100%;
    height: 2.2rem;
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #F0F3FA;
    img {
      position: absolute;
      left: 0.6rem;
      top: 0.6rem;
      border-radius: 4px;
      width: 1rem;
      height: 1rem;
    }
    span {
      position: absolute;
      top: 0.76rem;
      left: 1.98rem;
      font-size: 13px;
      color: #333;
    }
  }

</style>
