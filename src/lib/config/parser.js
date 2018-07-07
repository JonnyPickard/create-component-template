// @flow
const path = require('path');

const getConfig = require('./importer');

const { getAppRootDir } = require('../utils/helpers');

const mapTemplates = (
  configFile: Object,
  rootDir: string,
  componentName: string,
  componentPath: string
): Array<{
  [filePath: string]: string,
  [templatePath: string]: string
}> =>
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
): Array<{ [folder_path: string]: string }> => {
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
): {
  templates: Array<{
    [filePath: string]: string,
    [templatePath: string]: string
  }>,
  folders: Array<{ [folder_path: string]: string }>
} => {
  const rootDir = getAppRootDir();
  const configFile = await getConfig(rootDir, configPath);
  const folders = mapFolders(configFile, rootDir, componentName, componentPath);
  const templates = mapTemplates(
    configFile,
    rootDir,
    componentName,
    componentPath
  );

  return {
    templates,
    folders
  };
};

module.exports = mapConfigWithTemplates;
