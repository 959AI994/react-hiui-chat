const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { getAppEnvs } = require('../build/env')

const __DEV__ = process.env.NODE_ENV === 'development'

const baseConfig = require('../config')
const config = baseConfig[__DEV__ ? 'dev' : 'build']

const { hiuiPrefix } = config
const customHiuiPrefixLoader = {
  loader: require.resolve('string-replace-loader'),
  options: {
    search: /hi-v4/g,
    replace: hiuiPrefix,
  },
}

// common function to get style loaders
const getStyleLoaders = () => {
  const loaders = [
    __DEV__ ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 2,
        sourceMap: __DEV__,
      },
    },
    require.resolve('postcss-loader'),
    {
      loader: require.resolve('sass-loader'),
      options: {
        implementation: require('sass'),
        sassOptions: {
          includePaths: ['node_modules'],
        },
      },
    },
  ]

  return loaders
}

module.exports = {
  entry: paths.entry,
  devtool: process.env.sourceMap === 'none' ? false : process.env.sourceMap,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
    alias: {
      '@': paths.srcDir,
    },
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          __DEV__ ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: getStyleLoaders(),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
      },
      ...(!hiuiPrefix
        ? []
        : [
            {
              test: /index.scss.js$/,
              include: /node_modules/,
              ...customHiuiPrefixLoader,
            },
            {
              test: /@hi-ui(\\|\/)classname(\\|\/)lib(\\|\/)esm|cjs(\\|\/)index.js$/,
              include: /node_modules/,
              ...customHiuiPrefixLoader,
            },
            {
              test: /index.css/,
              include: /node_modules\/@hi-ui\/classic-theme/,
              ...customHiuiPrefixLoader,
            },
          ]),
    ],
  },
  plugins: [
    !baseConfig.typescript.ignoreTypeErrors &&
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: paths.tsConfig,
        },
      }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.staticDir,
          to: path.join(config.assetsSubDirectory, 'static'),
        },
      ],
    }),
    new webpack.DefinePlugin(
      getAppEnvs({
        __DEV__,
      })
    ),
  ].filter(Boolean),
}
