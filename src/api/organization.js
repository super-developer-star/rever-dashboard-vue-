import axios from 'axios'
import config from '../config.js'
import token from './token'
var baseURL = config.api

var organization = {}

organization.getById = function (organizationId) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations/' + organizationId
  return axios.get(url)
}

organization.getAll = function (filter) {
  let urlParams = {
    params: {

    }
  }
  if (filter) {
    urlParams.params.filter = filter
  }

  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations'
  return axios.get(url, urlParams)
}

organization.create = function (data) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations'
  return axios.post(url, data)
}

organization.update = function (organizationId, data) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations/' + organizationId
  return axios.put(url, data)
}

organization.getAccounts = function (organizationId, startAfter) {
  var queryParams = {
    limit: 15,
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
  const url = baseURL + '/api/v1/organizations/' + organizationId + '/accounts'
  return axios.get(url, config)
}

organization.getTags = function (organizationId) {
  axios.defaults.headers.common['Authorization'] = token.get()
  const url = baseURL + '/api/v1/organizations/' + organizationId + '/tags'
  return axios.get(url)
}

export default organization
