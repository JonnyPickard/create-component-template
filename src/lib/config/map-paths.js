// @flow
const path = require('path');

const getConfig = require('./importer');

const { getAppRootDir } = require('../utils/helpers');

type templatePathsArray = Array<{
  filePath: string,
  templatePath: string
}>;

type folderPathsArray = Array<string>;

/**
 *
 * @param  {Object} configFile
 * @param  {string} appRootDir
 * @param  {string} componentName
 * @param  {string} componentPath
 * @returns templatePathsArray
 */
const mapTemplatePaths = (
  configFile: Object,
  appRootDir: string,
  componentName: string,
  componentPath: string
): templatePathsArray =>
  configFile.templates.map(template => {
    const folderName = template.folderName || '';

    return {
      filePath: path.join(
        appRootDir,
        componentPath,
        componentName,
        folderName,
        template.fileName || componentName + template.extension
      ),
      templatePath: `${path.join(
        appRootDir,
        configFile.templatesDirectory,
        template.templateName
      )}`
    };
  });

const mapFolderPaths = (
  configFile: Object,
  appRootDir: string,
  componentName: string,
  componentPath: string
): folderPathsArray => {
  return configFile.templates
    .map(({ folderName }) => {
      if (folderName) {
        return path.join(appRootDir, componentPath, componentName, folderName);
      }
    })
    .filter(folder => folder);
};

const mapConfigWithTemplates = async (
  configPath: string,
  componentName: string,
  componentPath: string
): Promise<{
  templatePaths: templatePathsArray,
  folderPaths: folderPathsArray
}> => {
  const appRootDir = getAppRootDir();
  const configFile = await getConfig(appRootDir, configPath);
  const folderPaths = mapFolderPaths(
    configFile,
    appRootDir,
    componentName,
    componentPath
  );
  const templatePaths = mapTemplatePaths(
    configFile,
    appRootDir,
    componentName,
    componentPath
  );

  return {
    templatePaths,
    folderPaths
  };
};

module.exports = mapConfigWithTemplates;
