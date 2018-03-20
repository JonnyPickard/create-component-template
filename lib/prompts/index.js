const prompt = require('prompt');

const getComponentName = require('./get-component-name');
const getComponentPath = require('./get-component-path');
const getDependencies = require('./get-dependencies');

module.exports = async function promptUserIfRequired(options) {
  const { componentName, componentPath, dependenciesRequested } = options;

  prompt.message = '';
  prompt.delimiter = '';

  await prompt.start(); // All following function calls use prompt

  if (!componentPath) {
    options.componentPath = await getComponentPath({ componentPath });
  }

  if (!componentName) {
    options.componentName = await getComponentName({ componentName });
  }

  if (dependenciesRequested) {
    options.dependencies = await getDependencies();
    options.devDependencies = await getDependencies('dev');
  }

  await prompt.stop();

  return options;
};
