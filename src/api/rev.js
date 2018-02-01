import axios from 'axios'
import config from '../config.js'
import token from './token.js'
var baseURL = config.api
var rev = {}

rev.getById = function (organizationId, revId) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations/' + organizationId + '/revs/' + revId
  return axios.get(url)
}

rev.create = function (organizationId, data) {
  let urlParams = {
    params: {
      access_token: token.get()
    }
  }

  const url = baseURL + '/api/v1/organizations/' + organizationId + '/revs'
  return axios.post(url, data, urlParams)
}

export default rev
