// @flow
const path = require('path');

const { logError, logInfo } = require('../utils/logger');
const defaultArgs = require('../args/default.js');
const { getModuleRootDir } = require('../utils/helpers');

/*
  1 - check for specified config location
  2 - check package.json
  3 - check appRootDir TODO: Swap these
  4 - get from default path
 */

// CONFIG PATH IS THE PATH THE USER PASSES IN
const getConfig = async (appRootDir: string, configPath: string) => {
  // Provided config
  if (configPath) {
    return getConfigFromProvidedConfigPath(appRootDir, configPath);
  }

  let config;

  try {
    // Package Json
    // No Throw but move next
    config = getConfigFromPackageJson(appRootDir);
    if (config) {
      return config;
    }

    // Root Dir
    // No Throw but move next
    config = getConfigFromRootDir(appRootDir);
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
      Config could not be loaded, please ensure config is correctly specified in the package.json or a seperate config file.`);
  }
};

const getConfigFromProvidedConfigPath = (
  appRootDir: string,
  configPath: string
): Object | void => {
  try {
    return require(path.join(appRootDir, configPath));
  } catch (err) {
    logError(`${err}
      Config could not be loaded, please ensure provided config path is correct.`);
  }
};

const getConfigFromPackageJson = (appRootDir: string) => {
  try {
    return require(`${appRootDir}/package.json`)['cct.config'];
  } catch (err) {
    logError(err);
  } // Silence error
};

const getConfigFromRootDir = (appRootDir: string) => {
  try {
    require(`${appRootDir}/cct.config.default.js`);
  } catch (err) {
    logError(err);
  } // Silence error
};

const getConfigFromDefaultConfigPath = (
  moduleRootDir: string,
  configPath: string
) => {
  logInfo(`No config file found. Reverting to default templates.`);

  return require(path.join(moduleRootDir, configPath));
};

module.exports = getConfig;
