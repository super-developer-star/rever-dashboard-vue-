export const getToken = function (state) {
  return state.access.token
}

export const getLoggedInStatus = function (state) {
  return state.access.isLoggedInStatus
}

export const getAccount = function (state) {
  console.log('State')
  console.log(state.access)
  return state.access.account
}

export const getUserId = function (state) {
  return state.access.userId
}

export const getOrganizationId = function (state) {
  return state.access.organizationId
}

export const getOrganization = function (state) {
  return state.access.organization
}
