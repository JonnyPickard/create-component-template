module.exports = {
  templatesDirectory: './templates',
  templates: [
    {
      folder: '__fixtures__',
      template: 'fixture.template.js'
    },
    {
      folder: '__tests__',
      template: 'test.template.js'
    },
    {
      folder: '__themes__',
      template: 'scss.template.js'
    },
    {
      template: 'package.json.template.js'
    },
    {
      template: 'component.template.js'
    }
  ]
};
