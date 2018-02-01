import store from '../store'

var token = {}

token.get = function () {
  return store.state.access.token
}

export default token
