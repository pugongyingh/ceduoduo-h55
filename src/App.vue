<template>
  <div id="app">
    <router-view/>

    <my-loading v-if="loading"/>
    <van-tabbar active-color="#BD7030" inactive-color="#999999"
                v-if="pathUrl === '/mine' || pathUrl === '/shopBaby'
                || pathUrl === '/album' || pathUrl === '/square'
                || pathUrl === '/cart'"
                v-model="active" route>
      <van-tabbar-item to="/shopBaby">
        <span>店铺</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.mall : icon.inMall"
          style="width: 0.88rem;height: 0.88rem"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/album">
        <span>电子相册</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.album : icon.inAlbum"
          style="width: 0.88rem;height: 0.88rem"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/square">
        <span>广场</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.square : icon.inSquare"
          style="width: 0.88rem;height: 0.88rem"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/cart">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.cart : icon.inCart"
          style="width: 0.88rem;height: 0.88rem"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" :to="'/mine'">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.mine : icon.inMine"
          style="width: 0.88rem;height: 0.88rem"
        >
      </van-tabbar-item>
    </van-tabbar>

    <div class="space"
         v-if="pathUrl === '/shopBaby' ||  pathUrl === '/temp' || pathUrl === '/myBrightLamp' || pathUrl === '/activeCenter' || pathUrl === '/personal' || this.$route.query.tempId "
         v-model="active" route>
    </div>
  </div>
</template>

<script>
  import myLoading from './components/loading/loading.vue'

  export default {
    name: 'App',
    data() {
      return {
        isGet:false,
        active: 0,
        pathUrl: '',
        icon: {
          mall: require('@/assets/tabbarImages/mall_active.png'),
          inMall: require('@/assets/tabbarImages/mall_unactive.png'),
          album:require('@/assets/tabbarImages/album_active.png'),
          inAlbum:require('@/assets/tabbarImages/album_unactive.png'),
          cart: require('@/assets/tabbarImages/cart_active.png'),
          inCart: require('@/assets/tabbarImages/cart_unactive.png'),
          square: require('@/assets/tabbarImages/square_active.png'),
          inSquare: require('@/assets/tabbarImages/square_unactive.png'),
          mine: require('@/assets/tabbarImages/mine_active.png'),
          inMine: require('@/assets/tabbarImages/mine_unactive.png')
        }
      }
    },
    components: {
      myLoading
    },
    computed: {
      loading() {
        return this.$store.state.loading
      }
    },
    mounted() {
      this.getPagePath();
      let ls = localStorage.getItem('userMsg');

      console.log(ls);
      // if(this.$route.query){
      //   console.log(this.$route.query);
      //   console.log(location.hash.split('#')[1].split('?')[0]);
      // }else {
      //   console.log(1)
      // }
      // if (ls) {
      //   console.log(JSON.parse(ls));
      //   this.$router.push({path: '/chooseLamp'});
      // }
    },
    updated() {
      this.getPagePath();
      if( this.pathUrl !== '/home' && this.pathUrl !== '/chooseSeat'){
        if (window.localStorage.getItem('seatInfo')) {
          window.localStorage.removeItem('seatInfo');
        }
        if (window.localStorage.getItem('ifSelectNum')) {
          window.localStorage.removeItem('ifSelectNum');
        }
      }
    },
    methods: {
      getPath() {
        console.log(1)
      },
      getPagePath() {
        this.pathUrl = location.hash.split('#')[1].split('?')[0];
        // console.log(this.$route.query.tempId);
        // console.log(this.pathUrl);
      }
    }
  }
</script>

<style lang="less">
  /*@import "./assets/css/media.css";*/
  @import url('./assets/css/common.css');
  @num: 15px;
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 25px;
  }

  #app {
    background: #FAFAFA!important;
  }

  @media screen and (min-width: 320px) {
    html {
      font-size: 320/@num;
    }
  }

  @media screen and (min-width: 375px) {
    html {
      font-size: 375/@num;
    }
  }

  @media screen and (min-width: 414px) {
    html {
      font-size: 414/@num;
    }
  }

  /*.van-tabbar-item__icon {*/
  /*  height: 0.88rem;*/
  /*  width: 0.88rem;*/
  /*}*/

  /*.space {*/
  /*  height: 50px;*/
  /*}*/

  /*.shadow {*/
  /*  box-shadow: 0.08rem 0.4rem 0.16rem rgba(0, 0, 0, .2);*/
  /*}*/

  #app {
    min-height: 100vh;
    background-color: #ffffff;
    overflow: auto;
  }

  /*.submit {*/
  /*  width: 100%;*/
  /*  height: 4.44rem;*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*  background-size: 100% 3.76rem;*/
  /*  line-height: 3.76rem;*/
  /*  text-align: center;*/
  /*  background-repeat: no-repeat;*/
  /*  color: #885022;*/
  /*  font-size: 0.72rem;*/
  /*}*/

</style>
