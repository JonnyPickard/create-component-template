const path = require('path');
const { LIB_DIR_PARENT = 'src' } = process.env;

// @flow
const defaultArgs: {
  configPath: string,
  componentName: string,
  componentPath: string
} = {
  componentName: '',
  componentPath: 'src/components',
  configPath: path.join(LIB_DIR_PARENT, 'cct.config.js') // relative
};

module.exports = defaultArgs;
