import React      from 'react/addons'

import      Admin      from './admin.js'
import * as API        from './api.js'
import      Dashboard  from './dashboard.js'
import      Details    from './details.js'
import      Form       from './form.js'
import      Oops       from './oops.js'
import      Signin     from './signin.js'

export default ([head, ...tail]) => {
  return API.checkPriveleges().then((x) => {
    if (head === 'details')                 return [Details,    tail]
    if (!x.access)                          return [Signin,     tail]
    if (head === 'dashboard' || !head)      return [Dashboard,  tail]
    if (head === 'form')                    return [Form,       tail]
    if (head === 'admin' && x.admin)        return [Admin,      tail]
    else                                    return [Oops,       ['Not enough priveleges']]
  }, (err) => {
    console.log('nok')
    return [Oops, ["network error"]]
  }).catch((err) => {
    console.log('boo')
    console.log(err)
  })
}
