// @flow

const { isNodeModule } = require('../utils/helpers');

const defaultConfigPath: string = 'dist/lib/config/cct.config.default.js';

const defaultArgs: {
  configPath: string,
  componentName: string,
  componentPath: string
} = {
  configPath: isNodeModule()
    ? './node_modules/create-component-template/' + defaultConfigPath
    : './' + defaultConfigPath,
  // Nothing for these 2 by default so that they use the prompt
  componentName: '',
  componentPath: ''
};

module.exports = defaultArgs;
