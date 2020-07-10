<template>
  <div class="addAddress">
    <!--      导航栏-->
    <div class="navbar">
      <van-nav-bar
        title="编辑收货地址管理"
        left-arrow
        right-text="完成"
        @click-left="$router.go(-1)"
        @click-right="addAddress"
      />
      <van-field v-model="address.realName" label="收件人" placeholder="请输入" />
      <van-field v-model="address.phone" label="联系电话" placeholder="请输入" />
      <van-field
        v-model="showarea"
        label="所在地区"
        right-icon="arrow"
        placeholder="请选择"
        @focus="chooseArea = true"
      />
      <van-field
        v-model="address.detail"
        rows="2"
        autosize
        type="textarea"
        maxlength="120"
        placeholder="请输入地址"
        show-word-limit
      />
      <van-cell center title="设置为默认地址"  class="chooseDefault" >
        <template #right-icon>
          <van-switch v-model="address.isdefault" size="24" />
        </template>
      </van-cell>
      <van-cell @click="toDelete" title="删除收货地址" :style="{color:'#F4365A'}" />
    </div>

    <!--      选择地区-->
    <van-popup v-model="chooseArea" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar @confirm="selectArea" title="地区" :columns="area" />
    </van-popup>
  </div>
</template>

<script>
  import {save,get,deleteAddress} from "../../../../services/address";

  export default {
    name: "addAddress",
    computed:{
      id() {
        return this.$route.params.id
      }
    },
    data() {
      return {
        showarea:'',
        useId: this.$store.state.user.id,
        address:{
          detail:'',
          phone:'',
          isdefault:false,
          realName:'',
          district:'',
          province:'',
          city:'',
          user:{
            id:this.id
          }
        },
        chooseArea:false,
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
      selectArea(val) {
        this.chooseArea = false
        this.showarea = val[0] + val[1] + val[2]
        this.address.province = val[0]
        this.address.city = val[1]
        this.address.district = val[2]
      },
      addAddress() {
        save({
          address:this.address
        },res => {
          this.$toast('添加成功')
          const id = this.id
          this.$router.push('/addressManagement/' + id)
        })
      },
      toDelete() {
        deleteAddress({
          id:this.id
        },res => {
          this.$toast('删除成功')
          this.$router.push('/addressManagement/' + this.useId)
        })
      }
    },
    created() {
      get({
        id:this.id
      },res => {
        this.showarea = res.province + res.city + res.district
        this.address = res
      })
    }
  }
</script>

<style scoped lang="less">
  .chooseDefault {
    margin-top: 0.2rem;
  }
</style>
