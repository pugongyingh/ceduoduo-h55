<template>
    <div class="helpCenter">
      <van-nav-bar
        title="帮助中心"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <van-cell :title="item.title" v-for="item in list" :key="item" is-link @click="$router.push('/article?type=help&id=' + item.id)"  />
    </div>
</template>

<script>
  import {search} from "../../../../services/article";

  export default {
        name: "helpCenter",
    data() {
          return {
            list:[]
          }
    },
    created() {
          search({
            article:{
              title:'帮助中心'
            },
            pageable:{
              page:1,
              size:999,
              sort:{
                desc:['id']
              }
            }
          },res => {
            this.list = res
          })
    }
  }
</script>

<style scoped>

</style>
