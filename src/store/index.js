import Vue from 'vue'
import Vuex from 'vuex'
import access from './modules/access'
import * as globalGetters from './globalGetters'
import * as globalActions from './globalActions'
import globalMutations from './globalMutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    access
  },
  strict: debug,
  debug: true,
  actions: globalActions,
  getters: globalGetters,
  mutations: globalMutations,
  state: {
    alert: {
      status: false,
      message: '',
      type: ''
    }
  },
  plugins: [createPersistedState()]
})
