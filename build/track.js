const exec = require('exec-sh')
const paths = require('./paths')

const track = () => {
  exec('npx @mi/hi-track@latest from=hiui', {
    cwd: paths.projectDir,
    stdio: null,
  })
}

module.exports = track
