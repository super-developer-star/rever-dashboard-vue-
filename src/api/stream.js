import axios from 'axios'
import config from '../config.js'
import token from './token.js'
var baseURL = config.api
var stream = {}

stream.getOrganizationStream = function (startAfter) {
  var queryParams = {
    limit: 25,
    sortBy: 'updatedTimestamp',
    sortOrder: 'desc'
  }

  if (startAfter) {
    queryParams['startAfter'] = startAfter
  }

  var config = {
    params: queryParams
  }

  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/stream/organization'
  return axios.get(url, config)
}

stream.getUserStream = function (startAfter) {
  var queryParams = {
    limit: 25,
    sortBy: 'updatedTimestamp',
    sortOrder: 'desc'
  }

  if (startAfter) {
    queryParams['startAfter'] = startAfter
  }

  var config = {
    params: queryParams
  }

  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/stream/user'
  return axios.get(url, config)
}

export default stream
