const { red, green, magenta } = require('chalk');

module.exports = {
  logError: message => console.error(new Error(red(message))),
  logInfo: message => console.log(magenta(message)),
  logSuccess: message => console.log(green(message))
};
