/*
This is a React component generator script. It will generate the basic layout of a component for you.

For ease of use this should run via the package.json scripts section.

This will output the resulting folder structure:

a)  ComponentName
b)    ├── ComponentName.jsx
c)    ├── __fixtures__
d)    │   └── ComponentName.fixture.js
e)    ├── __tests__
f)    │   └── ComponentName.test.js
g)    ├── __themes__
h)    │   └── ComponentName.scss
i)    └── index.js

a: Component Folder 
b: ''        Class 
c: ''        Fixtures Folder -> For React cosmos 
d: ''        Fixture code for cosmos to render component
e: ''        Tests Folder -> For Jest
f: ''        Test Code
g: ''        Themes Folder -> Should contain scss files
h: ''        The default scss style sheet
i: ''        Index file for importing / exporting the component
j: ''        Components package.json
 */

process.argv[1] = 'create-component';

const fs = require('fs');
const util = require('util');
// const { argv } = require('yargs');
const prompt = require('prompt');
const mkdirp = require('mkdirp-promise');
const args = require('./lib/args/parse-args');

const {
  getDependencies,
  getComponentName,
  getComponentPath
} = require('./lib/prompts');
const { logInfo, logSuccess, logError } = require('./lib/utils/logger');
const mapConfig = require('./lib/config/parse-config');

const writeFile = util.promisify(fs.writeFile);

// const configPath = argv.config || argv.c || './lib/config/default-config.js';
// let componentName = argv.name || argv.n || '';
// let componentPath = argv.path || argv.p || '.';
// const dependencies = argv.dependencies || argv.d;
const options = {};

prompt.message = '';
prompt.delimiter = '';
//
// module.exports = (async function createComponent() {
//   await prompt.start(); // All following function calls use prompt
//
//   if (!componentPath) {
//     componentPath = await getComponentPath({ componentPath });
//   }
//
//   if (!componentName) {
//     componentName = await getComponentName({ componentName });
//   }
//
//   if (dependencies) {
//     options.dependencies = await getDependencies();
//     options.devDependencies = await getDependencies('dev');
//   }
//
//   await prompt.stop();
//
//   const { folders, templates } = await mapConfig(
//     configPath,
//     componentName,
//     componentPath
//   );
//
//   logInfo(`Scaffolding Component: ${componentName}`);
//
//   try {
//     await Promise.all(folders.map(folderName => mkdirp(folderName)));
//     await Promise.all(
//       templates.map(({ templatePath, filePath }) =>
//         writeFile(filePath, require(templatePath)(componentName, options))
//       )
//     );
//   } catch (err) {
//     logError(err);
//     logError(
//       `Component ${componentName} could not be built! Please check the above error log.\n`
//     );
//     process.exit(1);
//   }
//   logSuccess(
//     `Component ${componentName} was created succesfully! \nIt can be found at: '${componentPath}/${componentName}'.`
//   );
// })();
