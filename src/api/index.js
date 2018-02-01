import organization from './organization'
import stream from './stream'
import rev from './rev'
import account from './account'
import media from './media'

// AsyncComputed needs a promise to be resolved or rejected
// It does not accept a boolean result, therefore we need
// to return a wait statement for when we need to wait
const wait = function () {
  return new Promise(resolve =>
    resolve(false)
  )
}

const api = {
  wait: wait,
  organization: organization,
  account: account,
  stream: stream,
  rev: rev,
  media: media
}

export default api
