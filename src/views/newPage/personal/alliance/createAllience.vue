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
      <van-cell title="联盟头像" is-link value="选择头像" @click="uploadAvatar" >
        <template #default>
          <img :src="user.avatar" alt="" class="avatar">
        </template>
      </van-cell>
      <van-field label="联盟名称" input-align="right" v-model="user.name" />

      <div class="preview">
        <img :src="user.avatar" alt="">
      </div>

      <div class="button" @click="createAllience">
        创建
      </div>
      <van-uploader result-type="file" ref="uploader" accept="image/*" :after-read="afterRead" style="display: none" />
      <van-action-sheet
        v-model="uploadMethod"
        :actions="actions"
        @select="onSelect"
        cancel-text="取消"/>
    </div>
</template>

<script>
  import {uploadImg} from "@/utils/utils/utils";
  import {save} from "@/services/alliance.js";
    export default {
        name: "createAllience",
      data() {
          return {
            name:'',
            uploadMethod:false,
            actions:[{
              name:'系统头像'
            },{
              name:'自定义头像(需要审核)'
            }],
            user: {
              avatar:''
            }
          }
      },
      methods:{
        // 创建联盟
        createAllience() {
          let param = {
            "alliance": {
              "uncheckedAvatar": this.user.avatar,
              "name": this.user.name,
            }
          }
          save(param, res=>{

          })
        },
        uploadAvatar() {
          this.uploadMethod = true
        },
        onSelect(obj) {
          if (obj.name == '系统头像') {
            this.$router.push('/chooseAvatar')
          } else {
            this.$refs.uploader.chooseFile()
          }
        },
        afterRead(e) {
          uploadImg(e,(res) => {
            this.user.avatar = this.$store.state.prefix + res
            this.uploadMethod = false
            console.log(this.user.avatar)
          })
        },
      }
    }
</script>

<style scoped lang="less">
  .create {
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
    .avatar {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }

</style>
