'use strict'

import React  from 'react/addons'
import Router from './router.js'

var path = document.location.pathname.substr(1).split('/')
Router(path).then(([x, p]) => {
  React.render(React.createElement(x, {params: p}), document.getElementById('app'))
}, (err) => {
  React.render(<h1>Error occured</h1>, document.getElementById('app'))
})
