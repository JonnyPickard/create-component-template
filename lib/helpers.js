const chalk = require('chalk');

module.exports = {
  capitalize: string => string.replace(/\b\w/g, l => l.toUpperCase()),
  infoMessage: message => console.log(chalk.magenta(`\n${message}`))
};
