const findUp = require('find-up');
const pkgDir = require('pkg-dir');

/**
 * gets the module root dir path
 * @return {string} rootDir path
 */
const getModuleRootDir = () =>
  findUp.sync('create-component-template', {
    cwd: __dirname
  });

/**
 * gets the module root dir path
 * @return {string} rootDir path
 */
const getAppRootDir = () => pkgDir.sync(__dirname);

module.exports = {
  getAppRootDir,
  getModuleRootDir
};
