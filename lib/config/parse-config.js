const pkgDir = require('pkg-dir');

const { logError } = require('../logger.js');

const getConfig = async () => {
  const rootDir = await pkgDir(__dirname);

  let config;

  try {
    const pkgJson = require(`${rootDir}/package.json`);
    if (!pkgJson['create-component']) {
      config = require(`${rootDir}/package.json`);
    } else {
      config = pkgJson['create-component'];
    }
    return config;
  } catch (err) {
    logError(`
      Config could not be loaded, please ensure config is correctly specified in the package.json or a seperate config file.`);
  }
};

module.exports = {};
