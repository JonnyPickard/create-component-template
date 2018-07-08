// @flow
const path = require('path');
const LIB_DIR_PARENT: string = process.env.LIB_DIR_PARENT || 'src';

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
