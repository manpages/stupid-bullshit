import *          as Endpoints   from './endpoints.js'
import stringify                 from 'query-string'

var defaultConversionFn = stringify.stringify
var defaultPostHeaders  = {"content-type": "application/x-www-form-urlencoded"}

export function checkPriveleges(acc) {
  return new Promise((resolve, reject) => {
    var result      = {}
    if (acc) result = acc
    result.access   = true
    result.admin    = false
    return resolve(result)
  })
}

export function signup(user, password, acc) {
  return post({user: user, password: password}, 'user.php/signup', acc)
}

export function signin(user, password, acc) {
  return post({user: user, password: password}, 'user.php/signin', acc)
}

export function post(what, where, acc) {
  return reqDo(what, where, 'POST', defaultPostHeaders, defaultConversionFn, acc)
}

export function reqDo(what,
                      where,
                      method = 'POST',
                      headers = {},
                      conversionFn = defaultConversionFn,
                      acc = {}) {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest()
    req.open(method, where)
    for (var k in headers) {
      req.setRequestHeader(k, headers[k])
    }
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response, acc)
      } else {
        reject(Error(req.statusText))
      }
    }
    req.onerror = () => {
      reject(Error('Network error happened'), acc)
    }
    req.send(conversionFn(what))
  })
}
