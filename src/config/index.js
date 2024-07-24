export default Object.assign(
  {},
  require('./base.conf'),
  require(`./${process.env.DEPLOY_ENV}.conf.js`)
)
