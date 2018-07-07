// @flow
const findUp = require('find-up');

/**
 * gets the module root dir path
 * @return {string} rootDir path
 */
const getModuleRootDir = () => findUp.sync('create-component-template');

module.exports = {
  capitalize: (string: string) => string.replace(/\b\w/g, l => l.toUpperCase()),
  getRootDir: getModuleRootDir
};
