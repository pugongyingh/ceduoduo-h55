<template>
    <div class="manageAllience">
      <div class="navbar">
        <van-nav-bar
          title="商家联盟名称"
          left-arrow
          @click-left="$router.push('/alliance')"
        >
        </van-nav-bar>
      </div>
<!--      <van-cell title="联盟头像" is-link value="选择头像" @click="uploadAvatar" >-->
      <van-cell title="联盟头像" is-link >
        <template #default>
          <img :src="allianceDetail.userAvatar" alt="" class="avatar">
        </template>
      </van-cell>
      <van-field label="联盟名称"  input-align="right" v-model="allianceDetail.name" />
      <div class="preview">
        <img :src="allianceDetail.userAvatar" alt="">
      </div>

      <div class="button">
        <van-button type="default" @click="$router.push({path:'/manageMember',query: {type: 1}})">新增成员</van-button>
        <van-button type="default" @click="$router.push({path:'/manageMember',query: {type: -1}})">删减成员</van-button>
      </div>

      <van-action-sheet
        v-model="uploadMethod"
        :actions="actions"
        @select="onSelect"
        cancel-text="取消"/>
    </div>
</template>

<script>
  import { allianceFindDetailById } from '@/services/alliance.js'
    export default {
        name: "manageAllience",
      data() {
          return {
            name:'',
            uploadMethod:false,
            actions:[{
              name:'系统头像'
            },{
              name:'自定义头像'
            }],
            allianceDetail:{}
          }
      },
      computed:{
        id() {
          return this.$route.query.id
        },
      },
      mounted() {
        this.getMsg()
      },
      methods:{
        uploadAvatar() {
          this.uploadMethod = true
        },
        onSelect() {
          console.log(1)
        },
        getMsg() {
          let param = {
            id: this.id
          }
          allianceFindDetailById(param, res=>{
            this.allianceDetail = res
          })
        }
      }
    }
</script>

<style scoped lang="less">
  .manageAllience {
    .button {
      display: flex;
      justify-content: center;
      button {
        width:6rem;
        height:1.8rem;
        background:rgba(237,0,26,1);
        box-shadow:2px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:0.16rem;
        font-family:PingFang;
        font-size:0.64rem;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      button:last-child {
        margin-left: 1.32rem;
        width:6rem;
        height:1.8rem;
        background:rgba(255,255,255,1);
        box-shadow:2px 4px 43px 0px rgba(227,227,227,0.65);
        border-radius:0.16rem;
        font-family:PingFang;
        font-size:0.64rem;
        font-weight:500;
        color:rgba(237,0,25,1);
      }
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
    .avatar {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }

</style>
