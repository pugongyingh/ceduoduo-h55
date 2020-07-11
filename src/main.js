// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import Vant from 'vant'
import pinyin from 'js-pinyin'
import Vconsole from 'vconsole'
import echarts from 'echarts'
// let vConsole = new Vconsole();
var VueBetterScroll = require('vue2-better-scroll')

import './assets/css/common.css'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('languageSet') || 'zh',    // 从localStorage中获取语言设置，如果没有默认为中文简体
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./i18n/lang/zh'),   // 中文简体语言包
    'tw': require('./i18n/lang/tw')    // 中文繁体语言包
  }
})

import {Lazyload} from "vant";
import { Toast } from 'vant';

Vue.use(Toast);
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(VueBetterScroll)
Vue.prototype.$echarts = echarts;
Vue.prototype.$eventBus = new Vue();



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
