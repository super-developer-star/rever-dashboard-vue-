import * as types from '../../globalMutations-types'
import axios from 'axios'
import config from '../../../config.js'
const baseURL = config.api
import api from '../../../api'

const state = {
  account: {},
  userId: '',
  organization: {},
  organizationId: '',
  token: '',
  isLoggedInStatus: false
}

const actions = {
  login: function (context, account) {
    const url = baseURL + '/api/v1/login'

    return axios.post(url, account)
    .then((response) => {
      context.commit(types.IS_LOGGED_IN_STATUS, {
        status: true
      })

      context.commit(types.ACCOUNT, {
        account: response.data.user
      })

      context.commit(types.TOKEN, {
        token: response.data.id
      })

      context.commit(types.USERID, {
        userId: response.data.userId
      })

      context.commit(types.ORGANIZATIONID, {
        organizationId: response.data.user.organization._id.toString()
      })

      context.commit(types.ORGANIZATION, {
        organization: response.data.user.organization
      })

      return response.data
    })
    .catch((err) => {
      console.log('Error on action for login')
      console.log(err)
      throw err
    })
  },

  refreshAccountData: function (context, token) {
    return api.account.getMe()
    .then((response) => {
      console.log('Got response on refreshAccountData')
      console.log(response.data)

      context.commit(types.IS_LOGGED_IN_STATUS, {
        status: true
      })

      context.commit(types.ACCOUNT, {
        account: response.data
      })

      context.commit(types.USERID, {
        userId: response.data._id
      })

      context.commit(types.ORGANIZATIONID, {
        organizationId: response.data.organization._id.toString()
      })

      context.commit(types.ORGANIZATION, {
        organization: response.data.organization
      })

      console.log('Response data for refreshAccountData')
      return response.data
    })
    .catch((err) => {
      console.log('Error on action for refreshAccountData')
      console.log(err)
      throw err
    })
  },

  syncStateFromLocalStorage: function (context, token) {
    context.commit(types.IS_LOGGED_IN_STATUS, {
      status: true
    })

    context.commit(types.TOKEN, {
      token: token
    })
  },

  logout: function (context) {
    context.commit(types.IS_LOGGED_IN_STATUS, {
      status: false
    })

    context.commit(types.TOKEN, {
      token: ''
    })

    context.commit(types.ACCOUNT, {
      account: {}
    })

    context.commit(types.USERID, {
      userId: ''
    })

    context.commit(types.ORGANIZATIONID, {
      organizationId: ''
    })

    context.commit(types.ORGANIZATION, {
      organization: {}
    })
  }
}

const mutations = {
  [types.IS_LOGGED_IN_STATUS] (state, payload) {
    state.isLoggedInStatus = payload.status
  },

  [types.USERID] (state, payload) {
    state.userId = payload.userId
  },

  [types.ACCOUNT] (state, payload) {
    state.account = payload.account
  },

  [types.ORGANIZATIONID] (state, payload) {
    state.organizationId = payload.organizationId
  },

  [types.ORGANIZATION] (state, payload) {
    state.organization = payload.organization
  },

  [types.TOKEN] (state, payload) {
    state.token = payload.token
  }
}

const getters = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
