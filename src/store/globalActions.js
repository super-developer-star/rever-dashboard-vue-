import * as types from './globalMutations-types'

export const showAlert = function (context, payload) {
  console.log('Showing alert due to global action trigger')
  context.commit(types.ALERT_STATUS, {
    status: payload.status
  })

  context.commit(types.ALERT_TYPE, {
    type: payload.type
  })

  context.commit(types.ALERT_MESSAGE, {
    message: payload.message
  })
}

export const hideAlert = function (context) {
  console.log('Hiding alert due to global action trigger')
  context.commit(types.ALERT_STATUS, {
    status: false
  })

  context.commit(types.ALERT_TYPE, {
    type: ''
  })

  context.commit(types.ALERT_MESSAGE, {
    message: ''
  })
}
