<template>
  <div class="albumCategoryProduct">
<!--    <van-nav-bar-->
<!--      left-arrow-->
<!--      @click-left=""-->
<!--    >-->
<!--    </van-nav-bar>-->
    <div class="search">
      <div class="left">
        <img src="../../../assets/images/sousuo.png" alt="">
        <input type="text" placeholder="搜索想要的商品">
      </div>
      <div class="right" @click="$router.go(-1)">
        <p>取消</p>
      </div>
    </div>
    <div class="sort">
      <div :class='["list",item.checked?"list-active":""]' @click="checkBy(item,index)" v-for="(item,index) in sortRule">{{item.name}}
        <span>
            <div>
              <img src="../../../assets/newImages/shang.png" alt="">
              <img src="../../../assets/newImages/xia.png" alt="">
            </div>
        </span>
      </div>
    </div>
    <div class="good-list">
      <div class="good" v-for="item in goodList" @click="toPlatformProductDetail(item)">
        <div class="top">
          <img src="../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="bottom">
          <span class="name">{{item.name}}</span>
          <span class="sale">{{item.soldQuantity}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {search} from '@/services/platformProduct'
    export default {
        name: "albumMore",
      data() {
        return {
          goodList:[],
          sortRule:[
            {
              checked:true,
              name:'综合',
              desc: 'id'
            },
            {
              checked:false,
              name:'销量',
              desc: 'soldQuantity'
            },
          ]
        }
      },
      methods:{
        toPlatformProductDetail(id){
          this.$router.push({
            name: 'albumDetail',
            query: {
              goodId:id,
              url:'get'
            }
          })
        },
        checkBy(sort,index){
          this.sortRule.forEach(function (item,i) {
            item.checked = false
          })
          this.sortRule[index].checked = true
          search({
            "platformProduct": {
              "categoryName":this.$route.query.platformProduct.name
            },
            "pageable": {
              "page": 1,
              "size": 10,
              "sort": {
                "desc": [
                  sort.desc
                ]
              }
            }
          },res=>{
            this.goodList = res
          })
        }
      },
      mounted() {
        this.checkBy(this.sortRule[0],0)
      },
    }
</script>

<style lang="less" scoped>
.albumCategoryProduct {
    min-height: 100vh;
    .search{
      display: flex;
      justify-content: left;
      align-items:center;
      border-bottom: 1px solid #f5f4f4;
      .left{
        position: relative;
        display: flex;
        justify-content: left;
        padding: 0.3rem 0 0.3rem 0.3rem;
        img{
          width: 0.5rem;
          height: 0.5rem;
          position: absolute;
          margin: auto 0.5rem;
          top: 0;
          bottom: 0;
        }
        input{
          width: 12.5rem;
          height: 1.2rem;
          text-indent: 1.5rem;
          font-size: 0.52rem;
          color: #000;
          border: none;
          margin: 0;
          padding: 0;
          background: #f1f1f1;
          border-radius: 0.5rem;
        }
      }
      .right{
        width: 2rem;
        background: white;
        p{
          font-size: 0.56rem;
          text-align: center;
          background: rgba(251,251,251,1);
          color: #656565;
        }
      }
  }
  .sort{
    height: 1.2rem;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
    border-radius: 5rem;
    overflow: hidden;
    .list-active{
      background: #f5f5f5;
    }
    .list {
      text-align: center;
      width: 7.6rem;
      height: 1.2rem;
      font-size:0.52rem;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:1.2rem;
      >span {
        padding: 0 0.4rem;
        border-radius:20px;
        position: relative;
        div {
          position: absolute;
          top: 0.1rem;
          right: -0.22rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 0.52rem;
          height: 0.46rem;
          img {
            margin-top: 0.04rem;
            width: 0.26rem;
            height: 0.23rem;
          }
        }
      }
    }
  }
  .good-list{
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    .good{
      width: 5.9rem;
      height: 8rem;
      margin: 0.8rem;
      border-radius: 0.3rem;
      background: #ffffff;
      overflow: hidden;
      .top{
        width: 5.9rem;
        height: 6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .bottom{
        width: 5.5rem;
        height: 1.2rem;
        display: flex;
        padding: 0 0.2rem;
        justify-content: space-between;
        align-items: flex-end;
        .name{
          font-size: 0.52rem;
          color: #9A9A9A;
        }
        .sale{
          font-size: 0.44rem;
          color: #9A9A9A;
        }
      }
    }
  }
}
</style>
