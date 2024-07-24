const path = require('path')
const paths = require('./paths')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('../config').build
const { enabled: sentryEnabled, sentryPluginConfig } = config.sentryConfig

const webpackConfig = merge(baseWebpackConfig, {
  ...(sentryEnabled ? { devtool: 'hidden-source-map' } : {}),
  mode: config.mode,
  output: {
    path: config.assetsRoot,
    filename: path.join(config.assetsSubDirectory, 'js/[name].[chunkhash:8].js'),
    chunkFilename: path.join(config.assetsSubDirectory, 'js/[name].[chunkhash:8].chunk.js'),
    publicPath: config.assetsPublicPath,
    assetModuleFilename: 'imgs/[name].[contenthash:8][ext][query]',
    clean: true,
  },
  bail: true,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.[jt]s(\?.*)?$/i,
        // https://stackoverflow.com/questions/75698029/yarn-build-error-command-failed-with-exit-code-137-bitbucket-pipelines-out-o
        parallel: false,
        extractComments: true,
        terserOptions: {
          output: {
            beautify: false,
            comments: false,
          },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -30,
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        },
        hiui: {
          test: /[\\/]node_modules[\\/](@hi-ui)[\\/].+/,
          name: 'hiui',
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join(config.assetsSubDirectory, 'css/[name].[contenthash:8].css'),
      chunkFilename: path.join(config.assetsSubDirectory, 'css/[name].[contenthash:8].chunk.css'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.rootTemplate,
      templateParameters: {
        prefixUrl: path.join(config.assetsPublicPath, config.assetsSubDirectory),
      },
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 去除空格
        removeEmptyAttributes: true, // 去除空属性
      },
    }),
  ],
})

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (config.bundleSpeedTest) {
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
  const smp = new SpeedMeasurePlugin()

  smp.wrap(webpackConfig)
}

// sentry 配置
if (sentryEnabled) {
  const SentryPlugin = require('@sentry/webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')

  webpackConfig.plugins.push(new SentryPlugin(sentryPluginConfig))

  // 避免把 sourceMap 发到正式环境，在 sentry 上传完 sourceMap 后把 dist 下面的 map 文件删掉
  if (['pro'].includes(process.env.DEPLOY_ENV)) {
    webpackConfig.plugins.push(
      new CleanWebpackPlugin({
        // 输出日志
        verbose: true,
        // 是否保护 WebpackAssets 被删除
        protectWebpackAssets: false,
        // 建构后删除 map 文件（测试环境可根据需求是否需要删除）
        cleanAfterEveryBuildPatterns: ['**/*.js.map'],
      })
    )
  }
}

module.exports = webpackConfig
