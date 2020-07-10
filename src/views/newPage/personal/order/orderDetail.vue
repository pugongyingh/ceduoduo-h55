<template>
  <div class="orderDetail">
    <van-nav-bar
      title="我的订单"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div v-if="pageList.uploading">
      <div class="upload">
        <img src="../../../../assets/newImages/g3_ic_order_dsc.png" alt="">
        <span>待上传</span>
      </div>
      <div class="userInfo">
        <p style="margin-top: 0.4rem">
          <span>紫小静</span>
          <span>137****2013</span>
        </p>
        <p>广东省广州市天河区棠安路188号乐天大厦8楼808</p>
        <img src="../../../../assets/newImages/arrow-right.png" alt="">
      </div>
      <div class="goods">
        <div class="goodsImg">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p class="p1">冲印照片</p>
          <p class="p2">6寸；光面；3张</p>
        </div>
      </div>
      <div class="priceBox">
        <p>
          <span class="title">商品总价</span>
          <span>￥299.00</span>
        </p>
        <p>
          <span class="title">运费</span>
          <span>￥25.00</span>
        </p>
        <p>
          <span class="title">优惠金额</span>
          <span>-￥45.00</span>
        </p>
        <p>
          <span class="title">总计</span>
          <span style="color: #DD0B14">￥799.00</span>
        </p>
      </div>
      <div class="orderInfo">
        <p class="title">订单信息</p>
        <div class="otherInfo">
          <p>
            <span class="header">订单备注</span>
            <span>备注留言备注</span>
          </p>
          <p>
            <span class="header">订单号</span>
            <span>6023020190812001</span>
            <span style="font-weight:800;margin-left: 2rem">复制</span>
          </p>
          <p>
            <span class="header">创建时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
        </div>
      </div>
      <div class="options">
        <div style="color: #DD0B14">继续上传</div>
        <div>取消订单</div>
        <div>联系客服</div>
      </div>
    </div>

    <div v-if="pageList.paying">
      <div class="upload">
        <img src="../../../../assets/newImages/g3_ic_order_dsc.png" alt="">
        <span>待付款</span>
        <span style="font-size:0.52rem;color:rgba(153,153,153,1);left: 4.2rem">剩2小时59分自动关闭</span>
      </div>
      <div class="userInfo">
        <p style="margin-top: 0.4rem">
          <span>紫小静</span>
          <span>137****2013</span>
        </p>
        <p>广东省广州市天河区棠安路188号乐天大厦8楼808</p>
        <img src="../../../../assets/newImages/arrow-right.png" alt="">
      </div>
      <div class="goods">
        <div class="goodsImg">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p class="p1">冲印照片</p>
          <p class="p2">6寸；光面；3张</p>
        </div>
      </div>
      <div class="priceBox">
        <p>
          <span class="title">商品总价</span>
          <span>￥299.00</span>
        </p>
        <p>
          <span class="title">运费</span>
          <span>￥25.00</span>
        </p>
        <p>
          <span class="title">优惠金额</span>
          <span>-￥45.00</span>
        </p>
        <p>
          <span class="title">总计</span>
          <span style="color: #DD0B14">￥799.00</span>
        </p>
      </div>
      <div class="orderInfo">
        <p class="title">订单信息</p>
        <div class="otherInfo">
          <p>
            <span class="header">订单备注</span>
            <span>备注留言备注</span>
          </p>
          <p>
            <span class="header">订单号</span>
            <span>6023020190812001</span>
            <span style="font-weight:800;margin-left: 2rem">复制</span>
          </p>
          <p>
            <span class="header">创建时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
        </div>
      </div>
      <div class="options">
        <div style="color: #DD0B14" @click="$router.push('payment?type=pay')">支付</div>
        <div>取消订单</div>
        <div>联系客服</div>
      </div>
    </div>

    <div v-if="pageList.sending">
      <div class="upload">
        <img src="../../../../assets/newImages/g3_ic_order_dsc.png" alt="">
        <span>待发货</span>
      </div>
      <div class="userInfo">
        <p style="margin-top: 0.4rem">
          <span>紫小静</span>
          <span>137****2013</span>
        </p>
        <p>广东省广州市天河区棠安路188号乐天大厦8楼808</p>
        <img src="../../../../assets/newImages/arrow-right.png" alt="">
      </div>
      <div class="goods">
        <div class="goodsImg">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p class="p1">冲印照片</p>
          <p class="p2">6寸；光面；3张</p>
        </div>
        <div class="refund">
          退款
        </div>
      </div>
      <div class="priceBox">
        <p>
          <span class="title">商品总价</span>
          <span>￥299.00</span>
        </p>
        <p>
          <span class="title">运费</span>
          <span>￥25.00</span>
        </p>
        <p>
          <span class="title">优惠金额</span>
          <span>-￥45.00</span>
        </p>
        <p>
          <span class="title">总计</span>
          <span style="color: #DD0B14">￥799.00</span>
        </p>
      </div>
      <div class="orderInfo">
        <p class="title">订单信息</p>
        <div class="otherInfo">
          <p>
            <span class="header">订单备注</span>
            <span>备注留言备注</span>
          </p>
          <p>
            <span class="header">订单号</span>
            <span>6023020190812001</span>
            <span style="font-weight:800;margin-left: 2rem">复制</span>
          </p>
          <p>
            <span class="header">创建时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
        </div>
      </div>
      <div class="options">
        <div style="color: #DD0B14">提醒发货</div>
        <div>联系客服</div>
      </div>
    </div>


    <div v-if="pageList.receiving">
      <div class="upload">
        <img src="../../../../assets/newImages/g3_ic_order_dsc.png" alt="">
        <span>待收货</span>
      </div>
      <div class="userInfo">
        <p style="margin-top: 0.4rem">
          <span>快件已从北京转运中心发出，准备发往广州</span>
<!--          <span>137****2013</span>-->
        </p>
        <p style="color:rgba(153,153,153,1);">2020-12-31  23:23:59</p>
        <img src="../../../../assets/newImages/arrow-right.png" alt="">
      </div>
      <div class="goods">
        <div class="goodsImg">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p class="p1">冲印照片</p>
          <p class="p2">6寸；光面；3张</p>
        </div>
        <div class="refund">
          退款
        </div>
      </div>
      <div class="priceBox">
        <p>
          <span class="title">商品总价</span>
          <span>￥299.00</span>
        </p>
        <p>
          <span class="title">运费</span>
          <span>￥25.00</span>
        </p>
        <p>
          <span class="title">优惠金额</span>
          <span>-￥45.00</span>
        </p>
        <p>
          <span class="title">总计</span>
          <span style="color: #DD0B14">￥799.00</span>
        </p>
      </div>
      <div class="orderInfo">
        <p class="title">订单信息</p>
        <div class="otherInfo">
          <p>
            <span class="header">订单备注</span>
            <span>备注留言备注</span>
          </p>
          <p>
            <span class="header">订单号</span>
            <span>6023020190812001</span>
            <span style="font-weight:800;margin-left: 2rem">复制</span>
          </p>
          <p>
            <span class="header">创建时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
        </div>
      </div>
      <div class="options">
        <div style="color: #DD0B14">确认发货</div>
        <div>查看物流</div>
        <div>联系客服</div>
      </div>
    </div>


    <div v-if="pageList.commenting">
      <div class="upload">
        <img src="../../../../assets/newImages/g3_ic_order_dsc.png" alt="">
        <span>待评价</span>
      </div>
      <div class="userInfo">
        <p style="margin-top: 0.4rem">
          <span style="color:rgba(153,153,153,1);">无物流进度信息</span>
<!--          <span>137****2013</span>-->
        </p>
<!--        <p>广东省广州市天河区棠安路188号乐天大厦8楼808</p>-->
        <img src="../../../../assets/newImages/arrow-right.png" alt="">
      </div>
      <div class="goods">
        <div class="goodsImg">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p class="p1">冲印照片</p>
          <p class="p2">6寸；光面；3张</p>
        </div>
        <div class="refund">
          申请售后
        </div>
      </div>
      <div class="priceBox">
        <p>
          <span class="title">商品总价</span>
          <span>￥299.00</span>
        </p>
        <p>
          <span class="title">运费</span>
          <span>￥25.00</span>
        </p>
        <p>
          <span class="title">优惠金额</span>
          <span>-￥45.00</span>
        </p>
        <p>
          <span class="title">总计</span>
          <span style="color: #DD0B14">￥799.00</span>
        </p>
      </div>
      <div class="orderInfo">
        <p class="title">订单信息</p>
        <div class="otherInfo">
          <p>
            <span class="header">订单备注</span>
            <span>备注留言备注</span>
          </p>
          <p>
            <span class="header">订单号</span>
            <span>6023020190812001</span>
            <span style="font-weight:800;margin-left: 2rem">复制</span>
          </p>
          <p>
            <span class="header">创建时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
        </div>
      </div>
      <div class="options">
        <div style="color: #DD0B14">评价</div>
        <div>查看物流</div>
        <div>联系客服</div>
      </div>
    </div>

    <div v-if="pageList.closed">
      <div class="upload">
        <img src="../../../../assets/newImages/g3_ic_order_dsc.png" alt="">
        <span>交易关闭</span>
      </div>
      <div class="userInfo">
        <p style="margin-top: 0.4rem">
          <span>紫小静</span>
          <span>137****2013</span>
        </p>
        <p>广东省广州市天河区棠安路188号乐天大厦8楼808</p>
        <img src="../../../../assets/newImages/arrow-right.png" alt="">
      </div>
      <div class="goods">
        <div class="goodsImg">
          <img src="../../../../assets/images/ceshi.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p class="p1">冲印照片</p>
          <p class="p2">6寸；光面；3张</p>
        </div>
      </div>
      <div class="priceBox">
        <p>
          <span class="title">商品总价</span>
          <span>￥299.00</span>
        </p>
        <p>
          <span class="title">运费</span>
          <span>￥25.00</span>
        </p>
        <p>
          <span class="title">优惠金额</span>
          <span>-￥45.00</span>
        </p>
        <p>
          <span class="title">总计</span>
          <span style="color: #DD0B14">￥799.00</span>
        </p>
      </div>
      <div class="orderInfo">
        <p class="title">订单信息</p>
        <div class="otherInfo">
          <p>
            <span class="header">订单号</span>
            <span>6023020190812001</span>
            <span style="font-weight:800;margin-left: 2rem">复制</span>
          </p>
          <p>
            <span class="header">创建时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
          <p>
            <span class="header">付款时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
          <p>
            <span class="header">成交时间</span>
            <span>2019-10-13  23:30:45</span>
          </p>
        </div>
      </div>
      <div class="options">
        <div>联系客服</div>
        <div>删除订单</div>
      </div>
    </div>



    <div v-if="pageList.orderDetail" class="logistics ">
      <div class="top">
        <p style="border-bottom: 1px solid rgba(240,240,240,1)">
          <span class="name">物流公司</span>
          <span>顺丰快递</span>
        </p>
        <p>
          <span class="name">物流单号</span>
          <span>12364513131321</span>
        </p>
      </div>
      <div class="bottom">
        <van-steps direction="vertical" :active="0">
          <van-step>
            <p style="color:rgba(51,51,51,1);">【城市】物流状态1</p>
            <p>2016-07-12 12:40</p>
          </van-step>
          <van-step>
            <p style="color:rgba(51,51,51,1);">【城市】物流状态2</p>
            <p>2016-07-11 10:00</p>
          </van-step>
          <van-step>
            <p style="color:rgba(51,51,51,1);">快件已发货</p>
            <p>2016-07-10 09:30</p>
          </van-step>
        </van-steps>
      </div>
      <p class="nothing">暂无第三方物流信息</p>
    </div>
  </div>
</template>

<script>
  import mixin from '@/utils/mixins/mixin'
  export default {
    mixins:[mixin],
    data() {
      return {
        pageList:{
          uploading:0,
          paying:0,
          sending:0,
          receiving:0,
          commenting:0,
          closed:0,
          orderDetail:0
        }
      }
    },
    methods: {
      onSubmit() {
      }
    },
    mounted() {
      const type = this.$route.query.type
      this.pageList[type] = 1
    }
  }
</script>

<style lang="less" scoped>
  .orderDetail {
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;

    .van-nav-bar .van-icon {
      color: #666666;
    }

    .upload {
      width: 13.8rem;
      height: 2.2rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 2px 22px 0px rgba(227, 227, 227, 0.65);
      border-radius: 0.44rem;
      margin: 0.8rem auto;
      position: relative;

      img {
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        top: 50%;
        left: 0.6rem;
        transform: translateY(-50%);
      }

      span {
        font-size: 0.6rem;
        font-family: PingFang SC;
        /*font-weight:bold;*/
        color: rgba(51, 51, 51, 1);
        line-height: 1.04rem;
        position: absolute;
        top: 50%;
        left: 2rem;
        transform: translateY(-50%);
      }
    }

    .userInfo {
      width: 13.8rem;
      height: 2.8rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 2px 22px 0px rgba(227, 227, 227, 0.65);
      border-radius: 0.44rem;
      margin: auto;
      overflow: hidden;
      position: relative;

      p {
        font-size: 0.56rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1.04rem;
        margin-left: 0.4rem;
      }

      img {
        width: 0.28rem;
        height: 0.48rem;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .goods {
      width: 13.8rem;
      height: 4.4rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 2px 22px 0px rgba(227, 227, 227, 0.65);
      border-radius: 0.44rem;
      margin: 0.6rem auto;
      overflow: hidden;
      position: relative;

      .goodsImg {
        margin-top: 0.6rem;
        margin-left: 0.4rem;
        float: left;

        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 0.2rem;
        }
      }

      .goodsInfo {
        float: left;
        margin-left: 0.6rem;

        .p1 {
          font-size: 0.6rem;
          font-family: PingFang SC;
          /*font-weight:bold;*/
          color: rgba(51, 51, 51, 1);
          line-height: 1.04rem;
          margin-top: 0.72rem;
        }

        .p2 {
          font-size: 0.56rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 0.68rem;
          margin-top: 0.8rem;
        }
      }

      .refund {
        width:2.8rem;
        height:1.2rem;
        background:rgba(191,191,191,1);
        border-radius:0.08rem;
        position: absolute;
        right: 0.44rem;
        bottom: 0.6rem;
        font-size:0.48rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 1.2rem;
      }
    }

    .priceBox {
      width: 100%;
      height: 5rem;
      background: rgba(255, 255, 255, 1);
      overflow: hidden;
      p {
        font-size: 0.56rem;
        font-family: PingFang SC;
        font-weight: 500;
        margin-left: 0.6rem;
        margin-top: 0.36rem;
      }
      .title {
        display: inline-block;
        width: 3rem;
      }
    }

    .orderInfo {
      width:100%;
      /*height:6.2rem;*/
      background:rgba(255,255,255,1);
      margin-top: 0.6rem;
      padding: 0.8rem 0.6rem 0.6rem;
      box-sizing: border-box;
      .title {
        font-size:0.64rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(51,51,51,1);
        margin-bottom: 0.8rem;
      }
      .otherInfo {
        padding-top: 0.56rem;
        box-sizing: border-box;
        border-top: 1px solid rgba(229,235,240,1);
        p {
          font-size:0.56rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          margin-bottom: 0.56rem;
          .header {
            display: inline-block;
            width: 3.2rem;
          }
        }
      }
    }

    .options {
      width:100%;
      height:2.2rem;
      background:rgba(255,255,255,1);
      box-shadow:1px 2px 22px 0px rgba(227,227,227,0.65);
      margin-top: 0.8rem;
      div {
        width:3.6rem;
        height:1.28rem;
        background:rgba(255,255,255,1);
        border:1px solid rgba(153,153,153,1);
        border-radius:0.2rem;
        float: right;
        font-size:0.56rem;
        font-family:PingFang SC;
        /*font-weight:bold;*/
        color:rgba(51,51,51,1);
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        line-height: 1.28rem;
        margin-right: 0.6rem;
      }
    }

    .logistics {
      .top {
        width:13.8rem;
        height:4rem;
        background:rgba(255,255,255,1);
        box-shadow:1px 2px 22px 0px rgba(227,227,227,0.65);
        border-radius:0.4rem;
        margin: 0.8rem auto 0.6rem;
        p {
          height: 2rem;
          line-height: 2rem;
          span {
            font-size:0.6rem;
            font-family:PingFang SC;
            /*font-weight:bold;*/
            color:rgba(51,51,51,1);
          }
          .name {
            font-weight: 600;
            margin-left: 0.52rem;
            margin-right: 1.28rem;
          }
        }
      }
      .bottom {
        width:13.8rem;
        height:12rem;
        background:rgba(255,255,255,1);
        box-shadow:1px 2px 22px 0px rgba(227,227,227,0.65);
        border-radius:0.4rem;
        margin: auto;
      }
      .nothing {
        font-size:0.6rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:0.68rem;
        text-align: center;
        margin-top: 2.4rem;
      }
    }
  }
</style>
