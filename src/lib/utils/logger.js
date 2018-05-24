// @flow

const { red, green, magenta } = require('chalk');

module.exports = {
  logError: (message: string): void => console.error(new Error(red(message))),
  logInfo: (message: string) => console.log(magenta(message)),
  logSuccess: (message: string) => console.log(green(message))
};
