import axios from 'axios'
import config from '../config.js'
import token from './token'
var baseURL = config.api

var account = {}

account.accountStatus = function (data) {
  var url = baseURL + '/api/v1/accounts/status'
  return axios.post(url, data)
}

account.login = function (account) {
  var url = baseURL + '/api/v1/login'
  return axios.post(url, account)
}

account.getMe = function () {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/me'
  return axios.get(url)
}

account.getById = function (organizationId, accountId) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations/' + organizationId + '/accounts/' + accountId
  return axios.get(url)
}

account.create = function (organizationId, account) {
  axios.defaults.headers.common['Authorization'] = token.get()
  var url = baseURL + '/api/v1/organizations/' + organizationId + '/accounts'
  return axios.post(url, account)
}

account.update = function (organizationId, accountId, data) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations/' + organizationId + '/accounts/' + accountId
  return axios.put(url, data)
}

export default account
