<template>
  <div class="chooseTemplate">
    <div class="top">
      <img src="../../../assets/images/fanhui-1.png" alt="" class="fanhui" @click="$router.go(-1)">
      <div class="nav">{{$route.query.categoryName}}</div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经到底了~"
      @load="onLoad"
    >
      <div class="temp-wrap">
        <div class="temp-item" v-for="i in tempList" :key="i.id" @click="viewTemplate(i.id)">
          <div class="temp-img"><img :src="i.cover" alt=""></div>
          <div class="temp-title">{{i.name}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {searchTemplate} from '@/services/template'

  export default {
    data() {
      return {
        tempList: [],
        loading: false,
        finished: false,
        page: 0
      }
    },
    methods: {
      onLoad() {
        this.page += 1;
        let param = {
          pageable: {
            page: this.page,
            size: 9,
            sort: {
              asc: ["orderNumber", "id"]
            }
          },
          template: {
            status: "已启用"
          }
        };
        param.template.category = {id: Number(this.$route.query.categoryId)};

        searchTemplate(param, res => {
          this.tempList = this.tempList.length === 0 ? this.tempList = res : this.tempList.concat(res);

          this.loading = false;
          if(res.length < 9) {
            this.finished = true;
          }
        });
      },
      viewTemplate(tempId) {
        this.$router.push({
          name: 'tempDetail',
          query: {
            tempId: tempId
          }
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .chooseTemplate {
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
        flex: 0 0 50%;
        margin: 0.3rem 0 0.3rem;
        .temp-img {
          img {
            width: 6.6rem;
            height: 8.3rem;
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
