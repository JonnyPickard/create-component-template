// @flow
const defaultArgs: {
  configPath: string,
  componentName: string,
  componentPath: string
} = {
  // Nothing for these 2 by default so that they use the prompt
  componentName: '',
  componentPath: 'src/components',
  configPath: 'cct.config.default.js' // relative
};

module.exports = defaultArgs;
