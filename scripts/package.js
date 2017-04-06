const packager = require('electron-packager')
const exec = require('child_process').exec
var chalk = require('chalk');

const options = {
  asr: true,
  dir: `${__dirname}/../build`,
  appCopyright: '© 2017 Tata Consultancy Services Limited. All Rights Reserved.',
  platforms: ['darwin', 'win32', 'linux'],
  out: `${__dirname}/../dist`,
  overwrite: true,
  prune: true
}

exec('which wine', function(error, out) {

  const hasWine = error == null && out !== ''

  if (!hasWine) {
    console.log('')
    console.log(chalk.yellow('WARNING: "wine" is not installed. Windows build can not be packaged!'))
    console.log('')
  }

  options.platforms
    .filter(platform => platform !== 'win32' || hasWine)
    .map(platform => {
      packager(Object.assign({}, options, {
        platform
      }), function done_callback(err, appPaths) {
        if (err) console.error(chalk(err))
      })
    })
});