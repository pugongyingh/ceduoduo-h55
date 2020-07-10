<template>
    <div class="article">
      <van-nav-bar
        title="图文详情"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="content" v-html="content">

      </div>
    </div>
</template>

<script>
  import {search,get} from "../../../../services/article";

  export default {
        name: "article",
    data() {
          return {
            type:this.$route.query.type,
            content:''
          }
    },
    watch:{
          content(val) {
            this.$nextTick(() => {

              let pLength = document.querySelectorAll('p').length
              let imgLength = document.querySelectorAll('img').length
              for(let k = 0;k < pLength;k++) {
                document.querySelectorAll('p')[k].style.fontSize = '14px'
                document.querySelectorAll('p')[k].style.textIndent = '2em'
                if(document.querySelectorAll('p')[k].querySelector('img')) {
                  document.querySelectorAll('p')[k].style.textIndent = '0'
                }
              }
              for(let k = 0;k < imgLength;k++) {
                document.querySelectorAll('img')[0].style.width = '13.8rem'
                document.querySelectorAll('img')[0].style.borderRadius = '4px'
              }

            })
          }
    },
    created() {
        let title
        switch(this.type) {
          case 'aboutUs':
            title = '关于我们'
            search({
              article:{
                title
              },
              pageable:{
                page:1,
                size:999,
                sort:{desc:['id']}
              }
            },res => {
              this.content = res[0].content
            })
                break
          case 'privacy':
            title = ''
                break
          case 'help':
            let id = this.$route.query.id
            get({id},res => {
              this.content = res.content
            })
            break
          case 'agreement':
            get({id:26},res => {
              this.content = res.content
            })
            break
          case 'privacy':
            get({id:26},res => {
              this.content = res.content
            })
            break
        }
    }
  }
</script>

<style scoped lang="less">
 .content {
   padding: 0.6rem;
 }
</style>
