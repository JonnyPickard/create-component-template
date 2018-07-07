// @flow

const { getRootDir } = require('../utils/helpers');

const defaultConfigPath: string = 'cct.config.default.js';

const defaultArgs: {
  configPath: string,
  componentName: string,
  componentPath: string
} = {
  configPath: `${getRootDir()}/${defaultConfigPath}`,
  // Nothing for these 2 by default so that they use the prompt
  componentName: '',
  componentPath: ''
};

console.log(`defaultArgs`, defaultArgs);

module.exports = defaultArgs;
