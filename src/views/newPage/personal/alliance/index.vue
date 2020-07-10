<template>
  <div class="alliance">
    <div class="navbar">
      <van-nav-bar
        title="商家联盟"
        left-arrow
        @click-left="$router.push('/mine')"
      >
        <template #right>
          <van-icon name="scan" size="0.7rem"  style="margin-right: 0.4rem" />
          <van-icon name="search" size="0.7rem" @click="$router.push('/searchAlliance')" />
        </template>
      </van-nav-bar>
    </div>

    <div class="lock">
      <van-tabs v-model="active">
        <van-tab title="我的联盟">
          <div v-if="list.length > 0" class="list">
            <div class="container" v-for="item in myAllianceData" @click="$router.push('/allianceDetail?type=mine&id='+item.id)">
              <div class="left">
                <p style="font-size: 13px">{{item.name}}</p>
                <p style="margin-top: 3px;">
                  <span><van-icon name="manager" size="10px" /></span>
                  <span style="font-size:11px ">{{item.quantity}}</span>
                </p>
              </div>
              <div class="right">
                <img :src="item.uncheckedAvatar" alt="">
              </div>
            </div>
          </div>
          <div class="noneAllience" v-else>
            您目前没有创建联盟哦!
          </div>
        </van-tab>

        <van-tab title="全部联盟">
          <div class="top">
            <img src="../../../../assets/images/ceshi.jpg" alt="">
          </div>
          <div class="list">
            <div class="container" v-for="item in allianceData" @click="$router.push('/allianceDetail?type=other&&id='+item.id)">
              <div class="left">
                <p style="font-size: 13px">{{item.name}}</p>
                <p style="margin-top: 3px;">
                  <span><van-icon name="manager" size="10px" /></span>
                  <span style="font-size:11px ">{{item.quantity}}</span>
                </p>
              </div>
              <div class="right">
                <img src="../../../../assets/images/ceshi.jpg" alt="">
              </div>
            </div>
          </div>
        </van-tab>

      </van-tabs>

      <div class="button" v-if="active === 1"  @click="$router.push('/createAlliance')">
        创建商家联盟
      </div>
    </div>


  </div>
</template>

<script>
  import {findByMembers, findByAlliance} from '@/services/alliance.js'
    export default {
        name: "index",
      data() {
          return {
            active:0,
            list:[1],
            allianceData: [],
            myAllianceData: [],
          }
      },
      mounted() {
          this.getMembers()
          this.findByAlliance()
      },
      methods:{
          getMembers() {
            let param = {
              "pageable": {
                "page": 1,
                "size": 10,
                "sort": {
                  "desc": [
                    "id"
                  ]
                }
              }
            }
            findByMembers(param, res=>{
              this.myAllianceData = res
            })
          },

        findByAlliance() {
            let param = {
              'alliance': {

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
            }
          findByAlliance(param, res=>{
              res.map(r=>{
                if (r.status == '已启用') {
                  this.allianceData.push(r)
                }
              })
            })
          }
      }
    }
</script>

<style scoped lang="less">
  .alliance {
    height: 100vh;
    .lock {
      position: relative;

      .button {
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        color: white;
        font-size: 15px;
        background: #ED001A;
        position: absolute;
        bottom: 0;
      }
      .list {
        padding-bottom: 1.5rem;
        .container {
          background-color: white;
          width: 13.8rem;
          display: flex;
          height: 3.2rem;
          border: 1px solid #eee;
          margin: 0.4rem auto;
          .left {
            width: 9.8rem;
            p {
              margin-top: 0.8rem;
              margin-left: 0.4rem;
            }
          }
          .right {
            width: 4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
              width: 3.6rem;
              height: 2.4rem;

            }
          }


        }
      }
      .top {
        width: 100%;
        height:5rem ;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .noneAllience {
        text-align: center;
        margin-top: 4.18rem;
        font-size: 13px;
        color: #999;
      }
    }
  }

</style>
