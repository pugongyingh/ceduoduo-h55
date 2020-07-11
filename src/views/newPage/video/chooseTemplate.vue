<template>
    <div class="chooseTemplate">
      <van-nav-bar
        title="我的设计"
        left-arrow
        @click-left="$router.go(-1);$emit('back')"
      />
      <div class="category">
        <div :class='["item",chosen==-1? "item-active" : ""]' @click="chooseCategory(-1)">全部</div>
        <div :class='["item",chosen==index? "item-active" : ""]' v-for="(item,index) in category" @click="chooseCategory(index)">{{item.name}}</div>
      </div>
      <div class="good-list">
        <div class="good" v-for="item in templateList">
          <div class="top">
            <img :src="item.templateCover" alt="">
            <button>选择</button>
          </div>
          <div class="bottom">
            <span class="name">{{item.templateName}}</span>
          </div>`
        </div>
      </div>
    </div>
</template>

<script>
  import { searchTemplateCategory } from '@/services/templateCategory';
  import { search} from '@/services/album';
  export default {
    name: "chooseTemplate",
    data() {
        return {
          category:[],
          chosen:-1,
          templateList:[]
        }
      },
      props:['good'],
      methods:{
        chooseCategory(index){
          this.chosen = index
          this.updateTemplateList(index)
        },
        updateTemplateList(index){
          let that = this
          if(index!=-1){
            search({
              categoryId:that.category[index].id
            },res=>{
              this.templateList = res
              console.log(res)
            })
          }else{
            search({},res=>{
              this.templateList = res
            })
          }
        }
      },
      created() {
        searchTemplateCategory({
          "templateCategory": {
            "status": "启用"
          },
          "pageable": {
            "page": 1,
            "size": 10,
            "sort": {
              "desc": [
                "id"
              ]
            }
          }
        },res=>{
          this.category = res
          console.log(res)
        })
        this.updateTemplateList(-1)
      }
    }
</script>

<style scoped lang="less">
  .chooseTemplate{
    .category{
      display: flex;
      justify-content: left;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
      margin: 0 0.5rem 0 0.2rem;
      .item{
        height: 1.3rem;
        text-align: center;
        line-height: 1.5rem;
        font-family: PingFang;
        margin: 0 0.48rem;
        font-size: 0.56rem;
      }
      .item-active{
        color: rgba(221,11,20,1);
        border-bottom: 0.08rem solid rgba(221,11,20,1);
      }
    }
    .category::-webkit-scrollbar{
      display: none;
    }
    .good-list{
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      overflow: auto;
      .good{
        width: 5.9rem;
        height: 7.2rem;
        margin: 0.8rem 0.8rem 0.2rem;
        border-radius: 0.3rem;
        background: #f5f5f5;
        overflow: hidden;
        .top{
          width: 5.9rem;
          height: 6rem;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
          button{
            position: absolute;
            font-size: 0.48rem;
            padding: 0.1rem 0.3rem;
            bottom: 0.1rem;
            right: 0.1rem;
            border: none;
            color: #fff;
            border-radius: 0.5rem;
            background: #0000006b;
          }
        }
        .bottom{
          width: 5.5rem;
          height: 1.2rem;
          display: flex;
          line-height: 1rem;
          padding: 0 0.2rem;
          justify-content: space-between;
          align-items: flex-end;
          text-align: center;
          .name{
            font-size: 0.52rem;
            color: #9A9A9A;
          }
        }
      }
    }
  }
</style>
