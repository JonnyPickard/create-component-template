// @flow
const path = require('path');

const { logError, logInfo } = require('../utils/logger');
const defaultArgs = require('../args/default.js');

const pkgDir = require('pkg-dir');

/*
  1 - check for specified config location
  2 - check package.json
  3 - check rootDir TODO: Swap these
  4 - get from default path
 */

// CONFIG PATH IS THE PATH THE USER PASSES IN
const getConfig = async (rootDir: string, configPath: string) => {
  // Provided config
  if (configPath) {
    return getConfigFromProvidedConfigPath(pkgDir.sync(__dirname), configPath);
  }

  let config;

  try {
    // Package Json
    // No Throw but move next
    config = getConfigFromPackageJson(rootDir);

    if (config) {
      return config;
    }

    // Root Dir
    // No Throw but move next
    config = getConfigFromRootDir(rootDir);

    if (config) {
      return config;
    }

    // Default Config
    // Throw
    config = getConfigFromDefaultConfigPath(rootDir, defaultArgs.configPath);

    if (config) {
      return config;
    }
  } catch (err) {
    logError(`
      Config could not be loaded, please ensure config is correctly specified in the package.json or a seperate config file.`);
  }
};

const getConfigFromProvidedConfigPath = (
  pkgDir: string,
  configPath: string
): Object | void => {
  try {
    return require(path.join(pkgDir, configPath));
  } catch (err) {
    logError(`
      Config could not be loaded, please ensure provided config path is correct.`);
  }
};

const getConfigFromPackageJson = (rootDir: string) => {
  try {
    return require(`${rootDir}/package.json`)['cct.config'];
  } catch (err) {} // Silence error
};

const getConfigFromRootDir = (rootDir: string) => {
  try {
    require(`${rootDir}/cct.config.default.js`);
  } catch (err) {} // Silence error
};

const getConfigFromDefaultConfigPath = (
  rootDir: string,
  configPath: string
) => {
  logInfo(`No config file found. Reverting to default templates.`);
  return require(path.join(rootDir, configPath));
};

module.exports = getConfig;
