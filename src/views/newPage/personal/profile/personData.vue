<template>
    <div class="personalData">
<!--      导航栏-->
      <div class="navbar">
        <van-nav-bar
          title="个人资料"
          left-arrow
          right-text="完成"
          @click-left="$router.go(-1)"
        />
      </div>

<!--        表单-->
        <div class="personalData">
          <div class="avatar" @click="uploadAvatar">
            <div class="label">头像</div>
            <div class="img">
              <img src="../../../../assets/images/ceshi.jpg" alt="">
            </div>
            <van-icon class="avatar-arrow" name="arrow"  />
          </div>

          <van-cell class="nickname-cell" title="昵称" is-link value="内容" @click="changeNickname" />
          <van-cell title="绑定手机" is-link value="内容" @click="$router.push('/bindNewPhone')" />
          <van-cell title="所在地" is-link value="内容" @click="chooseArea = true" />
          <van-cell class="birthday-cell" title="出生日期" is-link value="内容" @click="chooseBirthday = true" />
          <van-cell title="修改密码" is-link @click="$router.push('/changePwd')"  />
          <van-cell title="收货地址管理" @click="$router.push('addressManagement')" is-link />
        </div>

<!--      选择上传头像方式-->
      <van-action-sheet
        v-model="uploadMethod"
        :actions="actions"
        @select="onSelect"
        cancel-text="取消"/>

<!--      选择地区-->
      <van-popup v-model="chooseArea" position="bottom" :style="{ height: '30%' }">
        <van-picker title="地区" :columns="area" />
      </van-popup>

<!--      选择生日-->
      <van-popup v-model="chooseBirthday" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
          v-model="user.birthday"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>

    </div>
</template>

<script>
    export default {
        name: "personData",
      data() {
          return {
            user:{
              birthday:new Date()
            },
             uploadMethod:false,
            actions:[{
               name:'系统头像'
            },{
               name:'自定义头像'
            }],
            chooseArea:false,
            chooseBirthday:false,
            minDate: new Date(1930, 0, 1),
            maxDate: new Date(2025, 10, 1),
            area:[
              {
                text: '浙江',
                children: [
                  {
                    text: '杭州',
                    children: [{ text: '西湖区' }, { text: '余杭区' }],
                  },
                  {
                    text: '温州',
                    children: [{ text: '鹿城区' }, { text: '瓯海区' }],
                  },
                ],
              }
            ]
          }
      },
        methods:{
          uploadAvatar() {
              this.uploadMethod = true
          },
          onSelect() {
            console.log(1)
          },
          changeNickname() {
            this.$router.push('/changeNickname')
          }
        }
    }
</script>

<style scoped lang="less">

  .avatar {
    width: 100%;
    height: 2.4rem;
    font-size: 16px;
    position: relative;
    background: #fff;
    border-bottom:10px solid #FAFAFA ;
    .label {
      position: absolute;
      top: 12px;
      left: 16px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      top: 0.24rem;
      right: 1.6rem;
    }
    .avatar-arrow {
      position: absolute;
      top: 0.68rem;
      right: 0.64rem;
    }
  }

  .nickname-cell,.birthday-cell {
    border-bottom: 10px solid #FAFAFA;
  }
</style>
