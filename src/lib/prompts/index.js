// @flow

const prompt = require('prompt');

const getComponentName = require('./get-component-name');
const getComponentPath = require('./get-component-path');
const { logError } = require('../utils/logger.js');

module.exports = async function promptUserIfRequired(options: Object): Object {
  const { componentName, componentPath } = options;

  prompt.message = '';
  prompt.delimiter = '';

  try {
    // All following function calls use prompt
    await prompt.start();

    if (!componentPath) {
      options.componentPath = await getComponentPath({ componentPath });
    }

    if (!componentName) {
      options.componentName = await getComponentName({ componentName });
    }

    await prompt.stop();
  } catch (err) {
    logError(err);
  }

  return options;
};
