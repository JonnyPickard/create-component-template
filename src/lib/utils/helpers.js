const path = require('path');
const pkgDir = require('pkg-dir');

const packageDir = pkgDir.sync(__dirname);
const splitPath = packageDir.split(path.sep);

/**
 * gets the root dir based on parent dir
 * Checks to see whether being run from node_modules or locally
 * @return {string} rootDir path
 */
const getRootDir = () => {
  let rootDir = isNodeModule()
    ? packageDir
        .split(path.sep)
        .slice(0, splitPath.length - 2)
        .join(path.sep)
    : packageDir;

  return rootDir;
};

const isNodeModule = () => {
  let parentDir = path.basename(
    splitPath.slice(0, splitPath.length - 1).join('/')
  );

  return parentDir === 'node_modules';
};

module.exports = {
  capitalize: string => string.replace(/\b\w/g, l => l.toUpperCase()),
  getRootDir,
  isNodeModule
};
