const defaultConfig = {
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
      templateName: 'component.template.js',
      extension: '.js'
    }
  ]
};

module.exports = defaultConfig;
