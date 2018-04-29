const chalk = require('chalk');
const prompt = require('prompt');

const { capitalize } = require('../utils/helpers');

module.exports = function getComponentName(options) {
  return new Promise((resolve, reject) => {
    const { defaultComponentName } = options;
    prompt.get({
      properties: {
        componentName: {
          description: chalk.magenta('Please enter a component name capitalized'),
          default: defaultComponentName
        }
      }
    }, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(capitalize(result.componentName));
    });
  });
};