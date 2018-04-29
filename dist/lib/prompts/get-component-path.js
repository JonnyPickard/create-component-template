const chalk = require('chalk');
const prompt = require('prompt');

module.exports = function getComponentPath(options) {
  return new Promise((resolve, reject) => {
    const { defaultPath } = options;
    prompt.get({
      properties: {
        componentPath: {
          description: chalk.magenta(`Please enter a folder path for the new component`),
          default: defaultPath
        }
      }
    }, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.componentPath);
    });
  });
};