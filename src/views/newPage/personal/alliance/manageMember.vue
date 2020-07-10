<template>
    <div class="manageMember">
      <van-nav-bar
        title="聊天成员"
        left-arrow
        :right-text="(type > 0 ? `确认`: `删除`)+`(`+val+`)`"
        @click-left="$router.go(-1)"
      />
      <div class="memberBody">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
        <van-index-bar>
          <van-checkbox-group v-model="result" @change="handleChange">
          <van-index-anchor index="A" v-show="AList.length > 0">
              <div class="list" v-for="(item,a) in AList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="B" v-show="BList.length > 0">
              <div class="list" v-for="(item,b) in BList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="C" v-show="CList.length > 0">
              <div class="list" v-for="(item,c) in CList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="D" v-show="DList.length > 0">
              <div class="list" v-for="(item,d) in DList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="E" v-show="EList.length > 0">
              <div class="list" v-for="(item,e) in EList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="F" v-show="FList.length > 0">
              <div class="list" v-for="(item,e) in FList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="G" v-show="GList.length > 0">
              <div class="list" v-for="(item,e) in GList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="H" v-show="HList.length > 0">
              <div class="list" v-for="(item,e) in HList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="I" v-show="IList.length > 0">
              <div class="list" v-for="(item,e) in IList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="J" v-show="JList.length > 0">
              <div class="list" v-for="(item,e) in JList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="K" v-show="KList.length > 0">
              <div class="list" v-for="(item,e) in KList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="L" v-show="LList.length > 0">
              <div class="list" v-for="(item,e) in LList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="M" v-show="MList.length > 0">
              <div class="list" v-for="(item,e) in MList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="O" v-show="OList.length > 0">
              <div class="list" v-for="(item,e) in OList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="P" v-show="PList.length > 0">
              <div class="list" v-for="(item,e) in PList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="Q" v-show="QList.length > 0">
              <div class="list" v-for="(item,e) in QList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="R" v-show="RList.length > 0">
              <div class="list" v-for="(item,e) in RList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="S" v-show="SList.length > 0">
              <div class="list" v-for="(item,e) in SList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="T" v-show="TList.length > 0">
              <div class="list" v-for="(item,e) in TList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="U" v-show="UList.length > 0">
              <div class="list" v-for="(item,e) in UList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="V" v-show="VList.length > 0">
              <div class="list" v-for="(item,e) in VList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="W" v-show="WList.length > 0">
              <div class="list" v-for="(item,e) in WList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="X" v-show="XList.length > 0">
              <div class="list" v-for="(item,e) in XList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="Y" v-show="YList.length > 0">
              <div class="list" v-for="(item,e) in YList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          <van-index-anchor index="Z" v-show="ZList.length > 0">
              <div class="list" v-for="(item,e) in ZList">
                <div class="l_c">
                  <img :src="item.cover" alt="">
                  <span>{{item.userName}}</span>
                </div>
                <van-checkbox :name="item.id"></van-checkbox>
              </div>
          </van-index-anchor>
          </van-checkbox-group>
        </van-index-bar>


      </div>
    </div>
</template>

<script>
  import { findByJoinedAllianceId , findByAllianceIdAndNameWithGrade} from '@/services/store.js'
  // import pinyin from '../../../../../node_modules/js-pinyin/index'
  import pinyin from 'js-pinyin'
    export default {
      name: "manageMember",
      data() {
        return {
          val: 0,
          value: '',
          result: [],
          data: [],
          type: this.$route.query.type,
          AList: [],
          BList: [],
          CList: [],
          DList: [],
          EList: [],
          FList: [],
          GList: [],
          HList: [],
          IList: [],
          JList: [],
          KList: [],
          LList: [],
          MList: [],
          NList: [],
          OList: [],
          PList: [],
          QList: [],
          RList: [],
          SList: [],
          TList: [],
          UList: [],
          VList: [],
          WList: [],
          XList: [],
          YList: [],
          ZList: [],
        };
      },
      mounted() {
        this.getMember()
      },
      methods: {
        handleChange(a) {
          this.val = a.length
        },
        getMember() {
          if (this.type === 1) {
            let param2 = {
              allianceId: 68,
              pageable: {page: 1, size: 999, sort: {desc: ["id"]}},
              phone: ""
            }
            // 获取所有要添加的商铺成员
            findByAllianceIdAndNameWithGrade(param2, res=>{
              // 并根据字母进行分组
              res.map((r,i)=>{
                let _t = this
                // 获取首字母
                let letter = pinyin.getCamelChars(r.userName).substring(0,1)
                if (letter == 'A') {
                  _t.AList.push(r)
                } else if (letter == 'B') {
                  _t.BList.push(r)
                }else if (letter == 'C') {
                  _t.CList.push(r)
                }else if (letter == 'D') {
                  _t.DList.push(r)
                }else if (letter == 'E') {
                  _t.EList.push(r)
                }else if (letter == 'F') {
                  _t.FList.push(r)
                }else if (letter == 'G') {
                  _t.GList.push(r)
                }else if (letter == 'H') {
                  _t.HList.push(r)
                }else if (letter == 'I') {
                  _t.IList.push(r)
                }else if (letter == 'J') {
                  _t.JList.push(r)
                }else if (letter == 'K') {
                  _t.KList.push(r)
                }else if (letter == 'L') {
                  _t.LList.push(r)
                }else if (letter == 'M') {
                  _t.MList.push(r)
                }else if (letter == 'O') {
                  _t.OList.push(r)
                }else if (letter == 'P') {
                  _t.PList.push(r)
                }else if (letter == 'Q') {
                  _t.QList.push(r)
                }else if (letter == 'R') {
                  _t.RList.push(r)
                }else if (letter == 'S') {
                  _t.SList.push(r)
                }else if (letter == 'T') {
                  _t.TList.push(r)
                }else if (letter == 'U') {
                  _t.UList.push(r)
                }else if (letter == 'V') {
                  _t.VList.push(r)
                }else if (letter == 'W') {
                  _t.WList.push(r)
                }else if (letter == 'X') {
                  _t.XList.push(r)
                }else if (letter == 'Y') {
                  _t.YList.push(r)
                } else if (letter == 'Z') {
                  _t.ZList.push(r)
                }
              })
            })
          } else if (this.type === -1) {
            let param2 = {
              allianceId: 68,
              pageable: {page: 1, size: 999, sort: {desc: ["id"]}},
              phone: ""
            }
            findByJoinedAllianceId(param2, res=>{
              this.data= res
            })
          }
        }
      }
    }
</script>

<style lang="less" scoped>
.manageMember {

  .memberBody {
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(229,229,229,1);
      margin: 0.4rem 0;
      .l_c {
        display: flex;
        align-items: center;
        img {
          width:1.6rem;
          height:1.6rem;
          background:rgba(229,229,229,1);
          border-radius:0.2rem;
          margin-left: 0.8rem;
        }
        span {
          display: inline-block;
          height: 0.84rem;
          margin: 0 0.5rem;
          font-size:0.6rem;
          font-family:PingFang;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:0.84rem;
          padding: 0.7rem 0;
        }
      }

      .van-checkbox {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        margin-right: 1.6rem;
      }
      .van-checkbox /deep/ .van-checkbox__icon--checked .van-icon {
        background-color: rgb(238,29,71);
        border-color: rgb(238,29,71);
      }
    }
  }

  .van-nav-bar /deep/ .van-nav-bar__text{
    width:2.4rem;
    height:0.86rem;
    background:rgba(237,0,26,1);
    border-radius:0.16rem;
    font-size:0.57rem;
    font-family:PingFang;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:0.86rem;
  }
}
</style>
