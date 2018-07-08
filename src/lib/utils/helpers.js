// @flow
const findUp = require('find-up');
const pkgDir = require('pkg-dir');
const findParentDir = require('find-parent-dir-from-bin');

const path = require('path');

const absDirPath = path.dirname(process.argv[1]);
const currentDirName = path.basename(absDirPath);
const runningFromBin = currentDirName === '.bin';

/**
 * gets the module root dir path
 * @return {string} moduleRootDir path
 */
const getModuleRootDir = () =>
  findUp.sync('create-component-template', {
    cwd: __dirname
  });

/**
 * gets the app root dir path
 * @return {string} appRootDir path
 */
const getAppRootDir = () => {
  if (runningFromBin) {
    return findParentDir(absDirPath);
  }

  // If not being run as a cli-tool
  return pkgDir.sync(__dirname);
};

module.exports = {
  capitalize: string => string.replace(/\b\w/g, l => l.toUpperCase()),
  getModuleRootDir,
  getAppRootDir
};
