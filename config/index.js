const paths = require('../build/paths')
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3001
const MOCK_PORT = process.env.MOCK_PORT || 4001

module.exports = {
  build: {
    mode: NODE_ENV,
    // 自定义 hiui 组件样式前缀，默认不开启
    // hiuiPrefix: 'my-app',
    assetsRoot: paths.distDir,
    assetsSubDirectory: './',
    assetsPublicPath: '/',
    bundleAnalyzerReport: process.env.size,
    bundleSpeedTest: process.env.speed,
    // 上传 SourceMap & 关联 commit 接入文档：https://xiaomi.f.mioffice.cn/docx/doxk413WDDlrRu474VejR52niBe
    sentryConfig: {
      // 是否开启上传，默认 false
      enable: false,
      sentryPluginConfig: {
        url: 'https://sentry.pt.xiaomi.com/',
        org: 'your org name',
        project: 'your project name',
        // Auth tokens can be obtained from https://sentry.pt.xiaomi.com/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: process.env.SENTRY_AUTH_TOKEN || 'your auth token',
        // 需要上传的目录
        include: './dist',
        // 需要忽略的目录
        ignore: ['node_modules'],
        release: process.env.CI_COMMIT_TAG,
        // 如果不是部署在根目录下需要指定文件路径，是的话可以不传
        // 如 js 路径为 https://xxx.com/my-project/js/main.js 需要配置为 '~/my-project'
        urlPrefix: '~/project-urlPrefix',
        setCommits: {
          auto: true,
          ignoreMissing: true,
        },
      },
    },
  },
  dev: {
    mode: NODE_ENV,
    // 自定义 hiui 组件样式前缀，默认不开启
    // hiuiPrefix: 'my-app',
    assetsRoot: paths.distDir,
    assetsSubDirectory: './',
    assetsPublicPath: '/',
    devServer: {
      host: 'localhost',
      port: PORT,
      open: true,
      historyApiFallback: true,
      proxy: Object.assign(
        {},
        process.env.USE_API === 'proxy' && {
          '/api/v1': {
            // 本地开发时，在这里你可以代理接口地址，轻松地进行跨域调试
            // 比如：测试环境接口【建议默认】、MApi 地址、或者后端联调本地 ip 地址等
            target: 'https://infra.mioffice.cn/mapi/api/mock/399/',
            changeOrigin: true,
            secure: false,
          },
        },
        process.env.USE_API === 'mock' && {
          '/api/v1': {
            target: `http://127.0.0.1:${MOCK_PORT}`,
            changeOrigin: true,
            secure: false,
          },
        }
      ),
    },
    apiMock: {
      host: 'localhost', // mock server running host
      port: MOCK_PORT, // mock server running port
      dataDir: paths.mocksDir, // mock data directory
      minDelay: 1000, // request Api delay (ms)
      apiBase: '/', // api url prefix path
      docPath: '/api-doc', // mock document url path, ensure only
    },
  },
  typescript: {
    // Dangerously ignore error even if your project has type errors when `ignoreTypeErrors` is `true`.
    ignoreTypeErrors: NODE_ENV === 'production',
  },
}
