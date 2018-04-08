// @flow

const path = require('path');

const { logError, logInfo } = require('../utils/logger');
const defaultArgs = require('../args/default-args.js');

/*
  1 - check for specified config location
  2 - check package.json
  3 - check rootDir
  4 - get from default path
 */
const getConfig = async (rootDir, configPath) => {
  // Provided config
  if (configPath !== defaultArgs.configPath) {
    return getConfigFromProvidedConfigPath(rootDir, configPath);
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
    config = getConfigFromDefaultConfigPath(rootDir, configPath);
    if (config) {
      return config;
    }
  } catch (err) {
    console.log('e', err);
    logError(`
      Config could not be loaded, please ensure config is correctly specified in the package.json or a seperate config file.`);
  }
};

const getConfigFromProvidedConfigPath = (
  rootDir: string,
  configPath: string
): Object | void => {
  try {
    return require(path.join(rootDir, configPath));
  } catch (err) {
    logError(`
      Config could not be loaded, please ensure provided config path is correct.`);
  }
};

const getConfigFromPackageJson = rootDir => {
  try {
    return require(`${rootDir}/package.json`)['cct-config'];
  } catch (err) {} // Silence error
};

const getConfigFromRootDir = rootDir => {
  try {
    require(`${rootDir}/cct.config.js`);
  } catch (err) {} // Silence error
};

const getConfigFromDefaultConfigPath = (rootDir, configPath) => {
  logInfo(`No config file found. Reverting to default templates.`);
  return require(path.join(rootDir, configPath));
};

module.exports = getConfig;
