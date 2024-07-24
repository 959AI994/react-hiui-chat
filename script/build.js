process.on('unhandledRejection', (err) => {
  throw err
})

const yargs = require('yargs')
const chalk = require('chalk')
const paths = require('../build/paths')
const trackHiUI = require('../build/track')
const { registerEnvs } = require('../build/env')

function parseArgs() {
  return yargs
    .version(false)
    .usage('$0 [options]')
    .options({
      env: {
        describe: 'Build project in the given deploy env',
        type: 'string',
        // choices: ['local', 'test', 'pre', 'pro'],
        default: 'pro',
      },
      analyze: {
        describe:
          'Inject some specified webpack analyzer, using likes: "--analyze.size --analyze.speed"',
        type: 'object',
        default: {},
      },
    })
    .alias('e', 'env')
    .alias('a', 'analyze')
    .alias('h', 'help').argv
}

function makeBuild(webpackConfig) {
  const webpack = require('webpack')

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stat) => {
      if (err) {
        console.log(err)
        compiler.close(() => console.log(err))
        return reject(err)
      }
      compiler.close(() => console.log('webpack compiler closed.'))
      resolve(stat)
    })
  })
}

function injectWebpackAnalyzer(analyzer) {
  for (const name in analyzer) {
    if (Object.prototype.hasOwnProperty.call(analyzer, name)) {
      process.env[name] = true
      console.log(
        chalk.bgGreen(chalk.black(' DONE ')) +
          ' ' +
          chalk.green(`Injected: Webpack Plugin ${name}.`)
      )
    }
  }
}

async function checkRunEnv() {
  try {
    trackHiUI()
  } catch (error) {}
}

function main() {
  const args = parseArgs()

  registerEnvs(args.env)

  injectWebpackAnalyzer(args.analyze)

  checkRunEnv().then(() => {
    const webpackConfig = require(paths.resolveWebpackConfig('prod'))

    makeBuild(webpackConfig).then((stat) => {
      console.log(stat.toString())
    })
  })
}

main()
