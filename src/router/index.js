import Vue from 'vue'
import Router from 'vue-router'
import {Toast} from 'vant'
import store from '../store/index'
Vue.use(Toast)


Vue.use(Router)

//定义路由规则
const routes = [
  {
    path: '/',
    redirect: '/userLogin'
  },
  {
    name: 'mine',
    path: '/mine',
    meta: {
      title: 'mine',
    },
    component: () => import('@/views/newPage/personal/profile/mine.vue')
  },
  {
    name: 'cart',
    path: '/cart',
    meta: {
      title: 'cart',
    },
    component: () => import('@/views/newPage/cart.vue')
  },
  {
    name: 'shopBaby',
    path: '/shopBaby',
    meta: {
      title: 'shopBaby',
    },
    component: () => import('@/views/newPage/store/shopBaby.vue')
  },
  {
    name: 'babyDetail',
    path: '/babyDetail',
    meta: {
      title: 'babyDetail',
    },
    component: () => import('@/views/newPage/store/babyDetail.vue')
  },
  {
    name: 'chattingRecords',
    path: '/chattingRecords',
    meta: {
      title: 'chattingRecords',
    },
    component: () => import('@/views/newPage/chattingRecords.vue')
  },
  {
    name: 'square',
    path: '/square',
    meta: {
      title: 'square',
    },
    component: () => import('@/views/newPage/square.vue')
  },
  {
    name: 'album',
    path: '/album',
    meta: {
      title: 'album',
    },
    component: () => import('@/views/newPage/album.vue')
  },
  {
    name: 'albumMore',
    path: '/albumMore',
    meta: {
      title: 'albumMore',
    },
    component: () => import('@/views/newPage/video/albumMore.vue')
  },
  {
    name: 'videoOrder',
    path: '/videoOrder',
    meta: {
      title: 'videoOrder',
    },
    component: () => import('@/views/newPage/video/order.vue'),
    children:[
      {
        name: 'videoAddress',
        path: '/videoAddress',
        meta: {
          title: 'videoAddress',
        },
        component: () => import('@/views/newPage/video/address.vue')
      },
      {
        name: 'videoAddAddress',
        path: '/videoAddAddress',
        meta: {
          title: 'videoAddAddress',
        },
        component: () => import('@/views/newPage/video/addAddress.vue')
      },
      {
        name: 'chooseTemplate',
        path: '/chooseTemplate',
        meta: {
          title: 'chooseTemplate',
        },
        component: () => import('@/views/newPage/video/chooseTemplate.vue')
      },
    ]
  },
  {
    name: 'videoSearch',
    path: '/videoSearch',
    meta: {
      title: 'videoSearch',
    },
    component: () => import('@/views/newPage/video/search.vue')
  },
  //相册详情
  {
    name: 'albumDetail',
    path: '/albumDetail',
    meta: {
      title: 'albumDetail',
    },
    component: () => import('@/views/newPage/video/albumDetail.vue')
  },
  {
    name: 'albumCategoryProduct',
    path: '/albumCategoryProduct',
    meta: {
      title: 'albumCategoryProduct',
    },
    component: () => import('@/views/newPage/video/albumCategoryProduct.vue')
  },
  {
    name: 'chooseTemplate',
    path: '/chooseTemplate',
    meta: {
      title: 'chooseTemplate',
    },
    component: () => import('@/views/newPage/albumTemplate/chooseTemplate.vue')
  },
  {
    name: 'albumTempSearch',
    path: '/albumTempSearch',
    meta: {
      title: 'albumTempSearch',
    },
    component: () => import('@/views/newPage/albumTemplate/search.vue')
  },
  //订单详情
  {
    name: 'orderDetail',
    path: '/orderDetail',
    meta: {
      title: 'orderDetail',
    },
    component: () => import('@/views/newPage/albumTemplate/orderDetail.vue')
  },
  //B5-1-3保存作品名称
  {
    name: 'saveWork',
    path: '/saveWork',
    meta: {
      title: 'saveWork',
    },
    component: () => import('@/views/newPage/albumTemplate/saveWork.vue')
  },
  //更多
  {
    name: 'tempCategory',
    path: '/tempCategory',
    meta: {
      title: 'tempCategory',
    },
    component: () => import('@/views/newPage/albumTemplate/tempCategory.vue')
  },
  {
    name: 'tempDetail',
    path: '/tempDetail',
    meta: {
      title: 'tempDetail',
    },
    component: () => import('@/views/newPage/albumTemplate/tempDetail.vue')
  },
  {
    name: 'userLogin',
    path: '/userLogin',
    meta: {
      title: 'login',
    },
    component: () => import('@/views/newPage/login/login.vue')
  },
  {
    name: 'setPassword',
    path: '/setPassword',
    meta: {
      title: 'setPassword',
    },
    component: () => import('@/views/newPage/login/setPassword.vue')
  },
  {
    name: 'modifyPassword',
    path: '/modifyPassword',
    meta: {
      title: 'modifyPassword',
    },
    component: () => import('@/views/newPage/login/modifyPassword.vue')
  },
  {
    name: 'userRegister',
    path: '/userRegister',
    meta: {
      title: 'register',
    },
    component: () => import('@/views/newPage/login/register.vue')
  },
  {
    name: 'password',
    path: '/password',
    meta: {
      title: 'password',
    },
    component: () => import('@/views/newPage/login/password.vue')
  },
  {
    name: 'advice',
    path: '/advice',
    meta: {
      title: 'password',
    },
    component: () => import('@/views/newPage/personal/setting/advice')
  },
  {
    name: 'bindAccount',
    path: '/bindUserAccount',
    meta: {
      title: 'bindAccount',
    },
    component: () => import('@/views/newPage/bindUserAccount.vue')
  },
  {
    name: 'userInfo',
    path: '/userInfo/:id',
    meta: {
      title: 'userInfo',
    },
    component: () => import('@/views/newPage/login/userInfo.vue')
  },
  {
    name: 'deskCalendar',
    path: '/deskCalendar',
    meta: {
      title: 'deskCalendar',
    },
    component: () => import('@/views/newPage/deskCalendar.vue')
  },
  {
    name: 'orderPage',
    path: '/orderPage',
    meta: {
      title: 'order',
    },
    component: () => import('@/views/newPage/order.vue')
  },
  {
    name: 'caseDetail',
    path: '/caseDetail',
    meta: {
      title: 'caseDetail',
    },
    component: () => import('@/views/newPage/caseDetail.vue')
  },
  {
    name: 'goodsDetail',
    path: '/goodsDetail',
    meta: {
      title: 'goodsDetail',
    },
    component: () => import('@/views/newPage/goodsDetail.vue')
  },
  {
    name: 'search',
    path: '/search',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/search/search.vue')
  },
  {
    name: 'personData',
    path: '/personData',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/personData.vue')
  },
  {
    name: 'changeNickname',
    path: '/changeNickname/:id',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/changeNickname.vue')
  },
  {
    name: 'bindNewPhone',
    path: '/bindNewPhone',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/bindNewPhone.vue')
  },
  {
    name: 'changePwd',
    path: '/changePwd',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/changePassword.vue')
  },
  {
    name: 'addressManagement',
    path: '/addressManagement/:id',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/addressManagement.vue')
  },
  {
    name: 'addAddress',
    path: '/addAddress/:id',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/addAddress.vue')
  },
  {
    name: 'myQrCode',
    path: '/myqrcode/:id',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/myQrCode.vue')
  },
  {
    name: 'identityConfirm',
    path: '/identityConfirm',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/identityConfirm/index.vue')
  },
  {
    name: 'editIdentity',
    path: '/editIdentity',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/identityConfirm/edit.vue')
  },
  {
    name: 'chooseAvatar',
    path: '/chooseAvatar',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/profile/chooseAvatar.vue')
  },
  {
    name: 'setting',
    path: '/setting',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/setting/index.vue')
  },
  {
    name: 'article',
    path: '/article',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/setting/article.vue')
  },
  {
    name: 'helpCenter',
    path: '/helpCenter',
    meta: {
      title: 'searchResult',
    },
    component: () => import('@/views/newPage/personal/setting/helpCenter.vue')
  },
  {
    name: 'orderDetailZero',
    path: '/orderDetailZero',
    meta: {
      title: 'orderDetailZero',
    },
    component: () => import('@/views/newPage/personal/order/orderDetail.vue')
  },
  {
    name: 'posterShare',
    path: '/posterShare',
    meta: {
      title: 'orderDetailZero',
    },
    component: () => import('@/views/newPage/personal/posterShare/posterShare.vue')
  },
  {
    name: 'myOrder',
    path: '/myOrder',
    meta: {
      title: 'orderDetailZero',
    },
    component: () => import('@/views/newPage/personal/order/myOrder.vue')
  },
  {
    name: 'vipOrder',
    path: '/vipOrder',
    meta: {
      title: 'orderDetailZero',
    },
    component: () => import('@/views/newPage/personal/order/vipOrder.vue')
  },
  {
    name: 'payment',
    path: '/payment',
    meta: {
      title: 'orderDetailZero',
    },
    component: () => import('@/views/newPage/personal/order/payment.vue')
  },
  {
    name: 'comment',
    path: '/comment',
    meta: {
      title: 'orderDetailZero',
    },
    component: () => import('@/views/newPage/personal/order/comment.vue')
  },
  {
    name: 'vipGift',
    path: '/vipGift',
    meta: {
      title: 'vipGift',
    },
    component: () => import('@/views/newPage/vipGift/index.vue')
  },
  {
    name: 'vipGiftOrder',
    path: '/vipGiftOrder',
    meta: {
      title: 'vipGift',
    },
    component: () => import('@/views/newPage/vipGift/order.vue')
  },
  {
    name: 'editAddress',
    path: '/editAddress/:id',
    meta: {
      title: 'editAddress',
    },
    component: () => import('@/views/newPage/personal/profile/editAddress.vue')
  },
  {
    name:'collection',
    path:'/collection',
    meta:{
      title:'collection'
    },
    component:() => import('@/views/newPage/personal/collection/myCollection.vue')
  },
  {
    name:'myWork',
    path:'/myWork',
    meta:{
      title:'myWork'
    },
    component:() => import('@/views/newPage/personal/myWork/myWork.vue')
  },
  {
    name:'workSetting',
    path:'/workSetting/:id',
    meta:{
      title:'workSetting'
    },
    component:() => import('@/views/newPage/personal/myWork/workSetting.vue')
  },
  {
    name:'workDetail',
    path:'/workDetail/:id',
    meta:{
      title:'workDetail'
    },
    component:() => import('@/views/newPage/personal/myWork/workDetail.vue')
  },
  {
    name:'game',
    path:'/game',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/myGame/game.vue')
  },
  {
    name:'bigGame',
    path:'/bigGame/:id',
    meta:{
      title:'bigGame'
    },
    component:() => import('@/views/newPage/bigGame/index.vue')
  },
  {
    name:'getReward',
    path:'/getReward',
    meta:{
      title:'getReward'
    },
    component:() => import('@/views/newPage/bigGame/getReward.vue')
  },
  {
    name:'getReward',
    path:'/getReward/:id',
    meta:{
      title:'getReward'
    },
    component:() => import('@/views/newPage/bigGame/getReward.vue')
  },
  {
    name:'rankList',
    path:'/rankList',
    meta:{
      title:'rankList'
    },
    component:() => import('@/views/newPage/bigGame/rankList.vue')
  },
  {
    name:'rankList',
    path:'/rankList/:id',
    meta:{
      title:'rankList'
    },
    component:() => import('@/views/newPage/bigGame/rankList.vue')
  },
  {
    name:'chooseMall',
    path:'/chooseMall',
    meta:{
      title:'chooseMall'
    },
    component:() => import('@/views/newPage/bigGame/chooseMall.vue')
  },
  {
    name:'chooseWorks',
    path:'/chooseWorks',
    meta:{
      title:'chooseWorks'
    },
    component:() => import('@/views/newPage/bigGame/chooseWorks.vue')
  },
  {
    name:'gameDetail',
    path:'/gameDetail/:id',
    meta:{
      title:'gameDetail'
    },
    component:() => import('@/views/newPage/bigGame/gameDetail.vue')
  },
  {
    name:'signIn',
    path:'/signIn',
    meta:{
      title:'signIn'
    },
    component:() => import('@/views/newPage/bigGame/signIn.vue')
  },
  {
    name:'living',
    path:'/living',
    meta:{
      title:'living'
    },
    component:() => import('@/views/newPage/live/living.vue')
  },
  {
    name:'wallet',
    path:'/wallet/:id',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/wallet/index')
  },
  {
    name:'detail',
    path:'/walletDetail',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/wallet/detail')
  },
  {
    name:'detail',
    path:'/getMoney',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/wallet/getMoney')
  },

  {
    name:'account',
    path:'/accountManager',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/wallet/accountManager')
  },
  {
    name:'account',
    path:'/getRecord',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/wallet/getRecord')
  },
  {
    name:'achievenment',
    path:'/achievenment',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/achievenment/index')
  },
  {
    name:'benefit',
    path:'/benefit',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/achievenment/benefit')
  },
  {
    name:'benefit',
    path:'/inviteDeal',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/achievenment/inviteDeal')
  },
  {
    name:'benefit',
    path:'/inviteRecord',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/achievenment/inviteRecord')
  },
  {
    name:'shareAchievenment',
    path:'/shareAchievenment',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/achievenment/shareAchievenment')
  },
  {
    name:'alliance',
    path:'/alliance',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/index')
  },
  {
    name:'alliance',
    path:'/searchAlliance',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/search')
  },
  {
    name:'alliance',
    path:'/createAlliance',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/createAllience')
  },
  {
    name:'manageAllience',
    path:'/manageAllience',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/manageAllience')
  },
  {
    name:'manageMember',
    path:'/manageMember',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/manageMember')
  },
  {
    name:'alliance',
    path:'/allianceDetail',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/allianceDetail')
  },
  {
    name:'alliance',
    path:'/allianceManage',
    meta:{
      title:'game'
    },
    component:() => import('@/views/newPage/personal/alliance/management')
  },
  {
    name:'recommendedWorks',
    path:'/recommendedWorks/:id',
    meta:{
      title:'recommendedWorks'
    },
    component:() => import('@/views/newPage/recommendedWorks')
  }
]

const router = new Router({
  routes
})

// 路由前置导航守卫
router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  // 根据路由元信息设置文档标题
  window.document.title = to.meta.title || "册多多"
  store.commit('saveLastRouter',{from:from.fullPath})
  let ls = localStorage.getItem('userMsg');
  if (!ls && to.path === '/mine') {
    Toast('您未登录账号')
    next({
      name: 'userLogin'
    });
  } else {
    next()
  }

});

export default router

