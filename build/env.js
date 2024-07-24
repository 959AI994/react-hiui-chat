const dotenv = require('dotenv')
const paths = require('./paths')

// register into src's JS Code as global constants by webpack.DefinePlugin
// all convert to string，includes object and code snippet
const getAppEnvs = (envConf = {}) => {
  return Object.keys(envConf).reduce(
    (env, key) => (env[key] = JSON.stringify(envConf[key])) && env,
    {
      'process.env.DEPLOY_ENV': JSON.stringify(process.env.DEPLOY_ENV),
    }
  )
}

const registerEnvs = (tag) => {
  const dotenvFiles = [paths.resolveDotEnv('base'), paths.resolveDotEnv(tag)]

  dotenvFiles.forEach((path) => {
    dotenv.config({
      path,
    })
  })
}

module.exports = { registerEnvs, getAppEnvs }
