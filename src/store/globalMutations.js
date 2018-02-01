import * as types from './globalMutations-types'

const mutations = {
  [types.ALERT_STATUS] (state, payload) {
    state.alert.status = payload.status
  },

  [types.ALERT_MESSAGE] (state, payload) {
    state.alert.message = payload.message
  },

  [types.ALERT_TYPE] (state, payload) {
    state.alert.type = payload.type
    console.log(state)
  }
}

export default mutations
