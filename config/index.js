const path = require('path')
const home = require('os').homedir()

module.exports = {
  official: 'SalakJS/templates',
  tmp: path.join(home, '.salak-templates'),
  homeConf: path.join(home, '.salak.js')
}
