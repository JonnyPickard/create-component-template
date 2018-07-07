// @flow
const path = require('path');

const getConfig = require('./importer');

const { getRootDir } = require('../utils/helpers');

const mapTemplates = (
  configFile: Object,
  rootDir: string,
  componentName: string,
  componentPath: string
) =>
  configFile.templates.map(template => {
    const folderName = template.folderName || '';

    return {
      filePath: path.join(
        rootDir,
        componentPath,
        componentName,
        folderName,
        template.fileName || componentName + template.extension
      ),
      templatePath: `${path.join(
        rootDir,
        configFile.templatesDirectory,
        template.templateName
      )}`
    };
  });

const mapFolders = (
  configFile: Object,
  rootDir: string,
  componentName: string,
  componentPath: string
) => {
  return configFile.templates
    .map(({ folderName }) => {
      if (folderName) {
        return path.join(rootDir, componentPath, componentName, folderName);
      }
    })
    .filter(folder => folder);
};

const mapConfigWithTemplates = async (
  configPath: string,
  componentName: string,
  componentPath: string
) => {
  const rootDir = getRootDir();

  const configFile = await getConfig(rootDir, configPath);
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

module.exports = mapConfigWithTemplates;
