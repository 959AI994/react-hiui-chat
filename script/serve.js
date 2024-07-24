process.on('unhandledRejection', (err) => {
  throw err
})

const yargs = require('yargs')
const chalk = require('chalk')
const portfinder = require('portfinder')
const paths = require('../build/paths')
const { registerEnvs } = require('../build/env')

function parseArgs() {
  return yargs
    .version(false)
    .usage('$0 [options]')
    .options({
      env: {
        describe: 'Serve project in the given deploy env',
        type: 'string',
        // choices: ['local', 'test', 'pre', 'pro'],
        default: 'local',
      },
      api: {
        describe: 'Choose the source of API data for local dev',
        type: 'string',
        default: 'none',
      },
    })
    .alias('e', 'env')
    .alias('a', 'api')
    .alias('h', 'help').argv
}

function startDevServer(webpackConfig) {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')

  return new Promise(() => {
    const devServerConfig = Object.assign({}, webpackConfig.devServer)

    const compiler = webpack(webpackConfig)

    const devServer = new WebpackDevServer(devServerConfig, compiler)

    const runServer = async () => {
      await devServer.start()
    }

    runServer()
  })
}

function choosePort(defaultPort) {
  portfinder.basePort = defaultPort

  return portfinder
    .getPortPromise()
    .then((port) => {
      if (port !== defaultPort) {
        console.log(
          chalk.bgYellow(chalk.black(' WARNING ')) +
            ' ' +
            chalk.yellow(`The port:${defaultPort} is occupied. `) +
            chalk.green(`Run the app on another port:${port} instead!`)
        )
      }

      return Promise.resolve(port)
    })
    .catch((err) => {
      throw new Error(
        chalk.red('No free port is found, please kill the process port and try again.') +
          '\n' +
          ('Network error message: ' + err.message || err) +
          '\n'
      )
    })
}

async function checkRunEnv(args) {
  if (args.api && args.api !== 'none') {
    process.env.USE_API = args.api
  }
  process.env.PORT = await choosePort(Number.parseInt(process.env.PORT))
  process.env.MOCK_PORT = await choosePort(Number.parseInt(process.env.MOCK_PORT))
  // you can do any check here, such as system, browser, network ...
}

function main() {
  const args = parseArgs()

  registerEnvs(args.env)

  checkRunEnv(args).then(() => {
    const webpackConfig = require(paths.resolveWebpackConfig('dev'))
    startDevServer(webpackConfig)
  })
}

if (require.main === module) {
  main()
}

module.exports.run = main
