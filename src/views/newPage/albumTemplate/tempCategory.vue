<template>
  <div class="outer">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">更多</div>
    </div>
    <div class="temp-wrap">
      <div class="temp-item" v-for="item in categoryList" :key="item.id" @click="toTemplate(item)">
        <div class="temp-img"><img :src="item.icon ? item.icon : undefined" alt=""></div>
        <div class="temp-title">{{item.name}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {searchTemplateCategory} from '@/services/templateCategory'

  export default {
		name: "tempCategory",
		data() {
			return {
        categoryList: []
      }
		},
    mounted() {
		  this.searchTempCategory();
    },
    methods: {
      searchTempCategory() {    //搜索模板分类
        let tempParam = {
          "templateCategory": {
            "status": "启用"
          },
          "pageable": {
            "page": 1,
            "size": 10,
            "sort": {
              "asc": [],
              "desc": [
                "id"
              ]
            }
          }
        };
        searchTemplateCategory(tempParam, res => {
          this.categoryList = res;
        });
      },
      toTemplate(category) {
        this.$router.push({
          name: 'chooseTemplate',
          query: {
            categoryId: category.id,
            categoryName: category.name
          }
        })
      }
    }
	}

</script>

<style scoped lang="less">
  .outer {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    .top {
      border-bottom: 1px solid #E6E6E6;
      /*width: 15rem;*/
      height: 2rem;
      line-height: 2rem;
      position: relative;
      .nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.72rem;
        font-family:PingFang;
        font-weight:bold;
      }
      .fanhui {
        position: absolute;
        left: 0.68rem;
        top: 0.6rem;
        width: 0.4rem;
        height: 0.78rem;
      }
    }
    .temp-wrap {
      text-align: center;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .temp-item {
        flex: 0 0 33.33%;
        margin: 0.3rem 0 0.3rem;
        width: 33.33%;
        .temp-img {
          img {
            width: 4.2rem;
            height: 5.36rem;
            object-fit: contain;
          }
        }
        .temp-title {
          text-align: center;
          font-size:0.52rem;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
    }
  }


</style>
