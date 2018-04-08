// @flow

type templateObject = {
  templateName: string,
  extension: string,
  folderName?: string,
  fileName?: string
};

export type config = {
  templatesDirectory: string,
  templates: Array<templateObject>
};

const defaultConfig: config = {
  templatesDirectory: './templates',
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
      fileName: 'index.js', // to NOTE Defaults to ComponentName if not specified
      templateName: 'component.template.js',
      extension: '.jsx'
    }
  ]
};

export default defaultConfig;
