'use strict'

import React  from 'react/addons'
import Router from './router.js'

var path = document.location.pathname.substr(1).split('/')
React.render(Router(path), document.getElementById('app'))
