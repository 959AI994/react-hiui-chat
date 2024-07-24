const path = require('path')

const PROJ_ROOT = path.dirname(__dirname)
const resolveApp = (...paths) => path.resolve(PROJ_ROOT, ...paths)

module.exports = {
  projectDir: resolveApp('.'),
  srcDir: resolveApp('src'),
  distDir: resolveApp('dist'),
  staticDir: resolveApp('static'),
  mocksDir: resolveApp('mocks'),
  entry: resolveApp('src/index'),
  rootTemplate: resolveApp('src/index.tpl.html'),
  nodeModules: resolveApp('node_modules'),
  tsConfig: resolveApp('tsconfig.json'),
  resolveSrc(...p) {
    return resolveApp('src', ...p)
  },
  resolveDotEnv(tag) {
    return resolveApp(`env/.env.${tag}`)
  },
  resolveWebpackConfig(env) {
    return resolveApp(`build/webpack.${env}.conf.js`)
  },
}
