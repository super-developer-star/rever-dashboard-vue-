import config from '../config.js'
import token from './token'
import Q from 'q'
var baseURL = config.api

var media = {}

// http://cloudinary.com/documentation/image_transformations
media.upload = function (fieldName, file, transformationOptions) {
  var d = Q.defer()
  const url = baseURL + '/api/v1/upload'

  var request = new window.XMLHttpRequest()
  var formData = new window.FormData()
  formData.append(fieldName, file)

  if (transformationOptions) {
    formData.append('transformations', JSON.stringify(transformationOptions))
  }

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var response = JSON.parse(request.response)
      d.resolve(response)
    }
    else {
      console.log('Request in state: ' + request.readyState)
    }
  }

  request.onerror = function (error) {
    d.reject(error)
  }

  request.open('POST', url)
  request.setRequestHeader('Authorization', token.get())
  request.send(formData)

  return d.promise
}

export default media
