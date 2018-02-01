<template>
  <div id="app">
    <loader ref="loader"></loader>
    <alert :data="alertData"></alert>
    <transition appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import store from './store/index'
import Loader from './components/utils/Loader.vue'
import InfiniteScroll from 'vue-infinite-scroll'
import alert from './components/utils/Alert2.vue'
import mixin from './mixins/mixin.vue'

Vue.use(VueLocalStorage)
Vue.use(InfiniteScroll)

export default {
  localStorage: {
    token: ''
  },

  store: store,

  name: 'app',

  data: function () {
    return {
      alertData: {
        status: false,
        type: '',
        message: ''
      }
    }
  },

  components: {
    'loader': Loader,
    'alert': alert
  },

  mixins: [mixin],

  methods: {

  },

  created () {
    if (this.$store.state.access.isLoggedInStatus && this.$store.state.access.token) {
      this.$localStorage.set('token', this.$store.state.access.token)
    }

    if (this.$localStorage.get('token')) {
      // TODO: this should also check if is valid
      this.$store.dispatch('syncStateFromLocalStorage', this.$localStorage.get('token'))
    }

    // this is ugly as hell
    // this.navigateTo('/')
    if (this.$store.state.access.isLoggedInStatus) {
      // this.$root.$router.go(-1)
    }
    else if (this.pathIs('/register/:invitationId')) {
      console.log('Register path')
      console.log(this.$route.path)
      // this.$root.$router.push(this.$route.path)
    }
    else {
      this.$root.$router.push('/access')
    }

    this.alertData = this.$store.state.alert
  }
}
</script>

<style lang="less">
  @import 'styleConfig.less';

  #app {
    background: @body-bg;
  }
</style>
