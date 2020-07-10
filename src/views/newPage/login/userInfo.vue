<template>
  <div class="password">
    <van-nav-bar
      title="个人资料"
      left-arrow
      right-text="完成"
      @click-left="$router.push($store.state.lastRouter)"
      @click-right="submitData"
    />

    <van-uploader result-type="file" ref="uploader" accept="image/*" :after-read="afterRead" style="display: none" />

    <van-cell title="头像" is-link value="内容" style="height: 2.4rem" class="avatarImg" @click="avatarShow = true">
      <template #default>
        <img :src="user.avatar" alt="" class="avatar">
      </template>
    </van-cell>
<!--    <van-cell title="昵称" is-link value="Kevin" style="margin: 0.4rem auto">-->
<!--      <template #default>-->
<!--        <input type="text" style="width: 60px">-->
<!--      </template>-->
<!--    </van-cell>-->
    <van-field
      v-model="user.nickname"
      label="昵称"
      right-icon="arrow-right"
      placeholder="输入昵称"
    />
    <van-cell title="绑定手机号" is-link :value="user.phone" @click="to('/bindNewPhone')"/>
    <van-cell title="所在地" is-link :value="user.area" @click="areaShow = true" />
<!--    <van-cell title="性别" is-link :value="user.sex" @click="sexShow = true" />-->
    <van-cell title="出生日期" is-link :value="user.birthday" @click="birthShow = true"/>
    <van-cell title="收货地址管理" is-link :value="user.address" style="margin-top: 0.4rem" @click="toAddress "/>
    <van-cell title="修改密码" is-link :value="user.password" style="margin-top: 0.4rem" @click="toModifyPassword"/>
    <van-popup v-model="avatarShow" position="bottom" :style="{ height: '30%' }" class="avatarProp">
      <van-cell value="系统头像" center @click="to('/chooseAvatar')"/>
      <van-cell value="自定义头像(需审核)" center @click="takePictureOnclick"/>
      <van-cell value="取消" center/>
    </van-popup>
    <van-popup v-model="birthShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
      />
    </van-popup>
<!--    选中地区-->
    <van-popup v-model="areaShow" position="bottom" :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        title="选择所在地"
        :columns="area"
        @cancel="areaShow = false"
        @confirm="onConfirmArea"
      />
    </van-popup>
  </div>
</template>

<script>
  import {post} from '@/utils/request/index'
  import {uploadImg} from "../../../utils/utils/utils";
  import mixin from '@/utils/mixins/mixin'
  import {get,update} from '@/services/user'
  import cityJson  from '../../../assets/area/area.json'

  export default {
    mixins:[mixin],
    data() {
      return {
        areaShow:false,
        sexShow:false,
        sexs:['男','女'],
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
        ],
        tel: '',
        securityCode: '',
        InvitationCode: '',
        checked: '',
        activeIndex: 1,
        avatarShow:false,
        birthShow:false,
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        user:{
          avatar:'',
          nickname:'',
          sex:'',
          area:'',
          birthday:'',
          phone:'',
          id:this.id,
          district:'',
          province:'',
          city:''
        }
      }
    },
    computed:{
      id() {
        return this.$route.params.id
      }
    },
    methods: {
      submitData() {
        // let province = Object.keys(cityJson)
        // let city = []
        // for (let i = 0; i < province.length; i++) {
        //   province[i]
        // }
        this.user.province = this.user.area[0]
        this.user.city = this.user.area[1]
        this.user.district = this.user.area[2]
        update({
            user:{
              id:this.user.id,
              birthday:this.user.birthday,
              avatar:this.user.avatar,
              city:this.user.city,
              district:this.user.district,
              province:this.user.province,
              nickname:this.user.nickname
            }
        },res => {
          this.$toast('修改成功')
          this.$router.push('/mine')
        })
      },
      toAddress() {
        this.$router.push('/addressManagement/' + this.$route.params.id)
      },
      // 修改密码
      toModifyPassword() {
        // ways: 1 代表是修改密码
        this.$router.push({path: '/modifyPassword/',params: {ways: 1}})
      },
      onSubmit() {
      },
      takePictureOnclick() {
        this.$refs.uploader.chooseFile()
      },
      afterRead(e) {
          uploadImg(e,(res) => {
            this.user.avatar = this.$store.state.prefix + res
            this.avatarShow = false
          })
      },
      onConfirm(val) {
        this.sexShow = false
        this.user.sex = val
      },
      onConfirmArea(val) {
        this.areaShow = false
        this.user.area = val
      },
      confirmDate(val) {
        this.birthShow = false
        var date = val;
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.user.birthday =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate
      }
    },
    created() {

    },
    mounted() {
      console.log(this.$store.state)
      const id = this.id
      get({id},res => {
        for(let k in this.user) {
          if(res.hasOwnProperty(k)) {
            this.user[k] = res[k]
          }
        }
        if(this.$route.query.hasOwnProperty('img')) {
          const systemImg = this.$route.query.img
          this.user.avatar = systemImg
        }
        this.user.area = res.province + ' ' + res.city + ' ' + res.district
      })

      cityJson.forEach(v => {

        let obj = {}
        obj.text = v.name

        if(v.city.length > 0) {

          obj.children = []
          v.city.forEach(i => {

            let child = {}

            child.text = i.name

            if(i.hasOwnProperty('area') && i.area.length > 0) {
              child.children = []

              i.area.forEach(k => {
                let area = {}
                area.text = k
                child.children.push(area)
              })

            }

            obj.children.push(child)
          })
        }

        this.area.push(obj)
      })


    }
  }
</script>

<style lang="less" scoped>
  .password {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;

    .van-nav-bar .van-icon {
      color: #666666;
    }

    .van-nav-bar__text {
      color: #323233;
    }

    .avatarImg {
      .van-cell__title {
        line-height: 40px;
      }

      .avatar {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
      }

      .van-cell__right-icon {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .avatarProp {
      .van-cell {
        height: 33.3%;
        .van-cell__value {
          line-height: 46.64px;
          text-align: center;
        }
      }
    }
  }
</style>
