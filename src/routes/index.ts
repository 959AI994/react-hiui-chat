import Home from '../views/home'
import Table from '../views/table'
import About from '../views/about'
import HookExample from '../views/hook-example'
import EffectExample from '../views/hook-example/effect'
import HiRequest from '../views/hi-request-example'
import reduxExample from '../views/redux-example'
import NoAuth from '../views/result/no-auth'
import NotFound from '../views/result/not-found'
import ServerError from '../views/result/server-error'
import DemoPage from '../views/demo-page'

const routeConfig = [
  { name: '首页', path: '/home', component: Home },
  {
    component: ServerError,
    path: '/500',
  },
  { name: 'demo 页面', path: '/demo-page', icon: 'home', component: DemoPage },
]

export default routeConfig
