// @flow
const path = require('path');
const { getModuleRootDir } = require('./lib/utils/pathing');

const LIB_DIR_PARENT: string = process.env.LIB_DIR_PARENT || 'src';

const defaultConfig = {
  templatesDirectory: path.join(
    getModuleRootDir(),
    LIB_DIR_PARENT,
    './templates'
  ),
  templates: [
    {
      folderName: '__fixtures__',
      templateName: 'fixture.template.js',
      extension: '.fixture.js' // Required
    },
    {
      folderName: '__tests__',
      templateName: 'test.template.js',
      extension: '.test.js'
    },
    {
      folderName: '__themes__',
      templateName: 'scss.template.js',
      extension: '.scss'
    },
    {
      fileName: 'package.json',
      templateName: 'package.json.template.js',
      extension: '.json'
    },
    {
      templateName: 'component.template.js',
      extension: '.js'
    }
  ]
};

module.exports = defaultConfig;
