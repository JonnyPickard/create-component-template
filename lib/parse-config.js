const pkgDir = require('pkg-dir');
const path = require('path');

const { logError } = require('../logger.js');

const getConfig = async rootDir => {
  let config;

  try {
    const pkgJson = require(`${rootDir}/package.json`);
    if (!pkgJson['create-component']) {
      config = require(`${rootDir}/create.config`);
    } else {
      config = pkgJson['create-component'];
    }
    return config;
  } catch (err) {
    logError(`
      Config could not be loaded, please ensure config is correctly specified in the package.json or a seperate config file.`);
  }
};

const mapTemplates = (configFile, rootDir, componentName, componentPath) =>
  configFile.templates.map(template => {
    const folderName = template.folderName || '';

    return {
      filePath: template.templateName.includes('package.json')
        ? path.join(rootDir, componentPath, componentName, 'package.json')
        : path.join(
            rootDir,
            componentPath,
            componentName,
            folderName,
            componentName + template.extension
          ),
      templatePath: `${path.join(
        rootDir,
        configFile.templatesDirectory,
        template.templateName
      )}`
    };
  });

const mapFolders = (configFile, rootDir, componentName, componentPath) =>
  configFile.templates
    .map(({ folderName }) => {
      if (folderName) {
        return path.join(rootDir, componentPath, componentName, folderName);
      }
    })
    .filter(folder => folder);

const mapConfig = async (componentName, componentPath) => {
  const rootDir = await pkgDir(__dirname);
  const configFile = await getConfig(rootDir);
  const folders = mapFolders(configFile, rootDir, componentName, componentPath);
  const templates = mapTemplates(
    configFile,
    rootDir,
    componentName,
    componentPath
  );

  return {
    folders,
    templates
  };
};

module.exports = mapConfig;
