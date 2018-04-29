const { isNodeModule } = require('../utils/helpers');

const defaultConfigPath = 'dist/lib/config/cct.config.default.js';

const defaultArgs = {
  configPath: isNodeModule() ? './node_modules/create-component-template/' + defaultConfigPath : './' + defaultConfigPath,
  componentName: '',
  componentPath: '.'
};

module.exports = defaultArgs;