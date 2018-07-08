// @flow
const path = require('path');

const { logError, logInfo } = require('../utils/logger');
const defaultArgs = require('../args/default.js');
const { getModuleRootDir } = require('../utils/pathing');

/*
  1 - check for specified config location
  2 - check appRootDir
  3 - check package.json
  4 - get from default path
 */
const getConfig = async (appRootDir: string, configPath: string): ?Object => {
  let config;

  try {
    if (configPath) {
      // Provided config
      return getConfigFromProvidedConfigPath(appRootDir, configPath);
    }

    // Root Dir
    // No Throw but move next
    config = getConfigFromRootDir(appRootDir);
    if (config) {
      return config;
    }

    // Package Json
    // No Throw but move next
    config = getConfigFromPackageJson(appRootDir);
    if (config) {
      return config;
    }

    // Default Config
    config = getConfigFromDefaultConfigPath(
      getModuleRootDir(),
      defaultArgs.configPath
    );

    if (config) {
      return config;
    }
  } catch (err) {
    logError(`${err}
      cct.config could not be loaded. please see the README for details on setting cct.config`);
  }
};

const getConfigFromProvidedConfigPath = (
  appRootDir: string,
  configPath: string
): ?Object => {
  try {
    return require(path.join(appRootDir, configPath));
  } catch (err) {
    throw new Error('cct.config at provided config path not found');
  }
};

const getConfigFromRootDir = (appRootDir: string): ?Object => {
  try {
    return require(path.join(appRootDir, 'cct.config.js'));
  } catch (err) {}
};

const getConfigFromPackageJson = (appRootDir: string): ?Object =>
  require(`${appRootDir}/package.json`)['cct.config'];

const getConfigFromDefaultConfigPath = (
  moduleRootDir: string,
  configPath: string
): ?Object => {
  logInfo(`No config file found. Reverting to default templates.`);

  return require(path.join(moduleRootDir, configPath));
};

module.exports = getConfig;
