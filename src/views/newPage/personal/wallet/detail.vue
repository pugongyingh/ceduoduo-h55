<template>
    <div>
      <div class="navbar">
        <van-nav-bar
          :title="type === 'money'? '余额明细':'积分记录'"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>

      <van-cell v-if="type === 'score'" :title="i.source" :value="'+' + i.point" :label="i.createAt" v-for="i in scoreDetail" :key="i" />
      <van-cell v-if="type === 'money'" :title="i.type" :value="i.amount" :label="i.createAt" v-for="i in incomeHistory" :key="i" />

    </div>
</template>

<script>
  import {findWithUserId} from "../../../../services/pointRecord";
  import {findIncomeWithUserId} from "../../../../services/incomeHistory";

  export default {
        name: "detail",
    data() {
          return {
              page:1,
            size:10,
            sort:{desc:['id']},
            scoreDetail:[],
            incomeHistory:[]
          }
    },
      computed:{
          type() {
            return this.$route.query.type
          }
      },
      mounted() {
          if(this.type === 'score') {
            findWithUserId({
              pageable:{
                page:this.page,
                size:this.size,
                sort:this.sort
              }
            },res => {
              this.scoreDetail = res
            })
          } else {
            findIncomeWithUserId({
              pageable:{
                page:this.page,
                size:this.size,
                sort:this.sort
              }
            },res => {
              this.incomeHistory = res
            })
          }

      }
    }
</script>

<style scoped>

</style>
