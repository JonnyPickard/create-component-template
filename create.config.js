module.exports = {
  templatesDirectory: './templates',
  templates: [
    {
      folderName: '__fixtures__',
      templateName: 'fixture.template.js',
      extension: '.fixture.js'
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
      templateName: 'package.json.template.js',
      extension: '.json'
    },
    {
      templateName: 'component.template.js',
      extension: '.jsx'
    }
  ]
};
