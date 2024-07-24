const path = require('path')
const paths = require('./paths')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const semver = require('semver')
const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('../config').dev

const __MOCK__ = process.env.USE_API === 'mock'

module.exports = merge(baseWebpackConfig, {
  mode: config.mode,
  stats: 'errors-only',
  output: {
    path: config.assetsRoot,
    filename: path.join(config.assetsSubDirectory, 'js/[name].js'),
    chunkFilename: path.join(config.assetsSubDirectory, 'js/[name].chunk.js'),
    publicPath: config.assetsPublicPath,
  },
  devServer: {
    ...config.devServer,
    hot: true,
    client: {
      logging: 'error',
      overlay: true,
    },
    static: {
      watch: true,
      publicPath: config.assetsPublicPath,
      directory: config.assetsRoot,
    },
    onBeforeSetupMiddleware: __MOCK__ ? require('@mi/api-mocker')(config.apiMock) : undefined,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.rootTemplate,
      templateParameters: {
        prefixUrl: path.join(config.assetsPublicPath, config.assetsSubDirectory),
      },
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here 🔥 ${config.devServer.https ? 'https' : 'http'}://${
            config.devServer.host
          }:${config.devServer.port}`,
          __MOCK__ &&
            `Mock Document is running here 🌱 http://${config.apiMock.host}:${config.apiMock.port}${config.apiMock.docPath}`,
        ].filter(Boolean),
        notes: checkNodeVersion(),
      },
    }),
  ],
})

function checkNodeVersion() {
  return semver.gte(process.version, '10.13.0') ? [] : ['Node version less than 10.13.0']
}
