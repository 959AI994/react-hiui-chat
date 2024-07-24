import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
// 需要接入 sentry，取消注释并阅读文件中接入文档
// import './utils/sentry'

import 'normalize.css'
import '@/common/styles/base.scss'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
