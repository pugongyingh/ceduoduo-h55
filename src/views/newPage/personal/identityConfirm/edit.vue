<template>
    <div class="editForm">
      <!--      导航栏-->
      <div class="navbar">
        <van-nav-bar
          :title="title"
          left-arrow
          right-text="完成"
          @click-left="$router.go(-1)"
        />
      </div>

      <div class="form" style="margin-top: 0.74rem">
        <van-field
          :value="value"
          :placeholder="placeholder"
        />
      </div>
    </div>
</template>

<script>
    export default {
        name: "edit",
      data() {
          return {
            value:'',
            placeholder:'',
            title:'',
            type:''
          }
      },
      created() {
        this.type = this.$route.query.type
        switch(this.type) {
            case 'name' :
              this.placeholder = '请输入你的名字'
              this.title = '真实姓名'
                break
            case 'idcode':
              this.placeholder = '请输入身份证号'
              this.title = '身份证号码'
              break
            case 'phone':
              this.placeholder = '请输入联系电话'
              this.title = '联系号码'
              break
            case 'address':
              this.placeholder = '请输入店铺所在地址'
              this.title = '所在地址'
              break
        }
      }
    }
</script>

<style scoped>

</style>
