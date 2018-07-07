// @flow

console.log(`process.env`, process.env.NODE_ENV);

console.log(__dirname);

const path = require('path');
const pkgDir = require('pkg-dir');

const packageDir = pkgDir.sync(__dirname);
const splitPath = packageDir.split(path.sep);

console.log(`packageDir`, packageDir);

/**
 * gets the root dir based on parent dir
 * Checks to see whether being run from node_modules or locally
 * @return {string} rootDir path
 */
const getModuleRootDir = () => {
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
  capitalize: (string: string) => string.replace(/\b\w/g, l => l.toUpperCase()),
  getRootDir: getModuleRootDir,
  isNodeModule
};
