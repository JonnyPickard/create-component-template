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

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const { argv } = require('yargs');
const prompt = require('prompt');
const mkdirp = require('mkdirp-promise');

const componentTemplate = require('./templates/component.template');
const fixtureTemplate = require('./templates/fixture.template');
const packageJsonTemplate = require('./templates/package.json.template');
const scssTemplate = require('./templates/scss.template');
const testTemplate = require('./templates/test.template');

const getDependencies = require('./lib/get-dependencies');
const getComponentName = require('./lib/get-component-name');
const getComponentPath = require('./lib/get-component-path');
const { infoMessage } = require('./lib/helpers');

const writeFile = util.promisify(fs.writeFile);

const defaultComponentName = argv.name || argv.n || '';
const defaultPath = argv.path || argv.p || '.';

prompt.message = '';
prompt.delimiter = '';

module.exports = (async function createComponent() {
  await prompt.start(); // All following function calls use prompt
  const componentName = await getComponentName({ defaultComponentName });
  const componentPath = await getComponentPath({ defaultPath });
  const dependencies = await getDependencies();
  const devDependencies = await getDependencies('dev');
  await prompt.stop();

  infoMessage(`Scaffolding Component: ${componentName}`);

  try {
    await Promise.all([
      mkdirp(`${componentPath}/${componentName}/__fixtures__`),
      mkdirp(`${componentPath}/${componentName}/__tests__`),
      mkdirp(`${componentPath}/${componentName}/__themes__`)
    ]);
    await Promise.all([
      /** Component */
      writeFile(
        `${componentPath}/${componentName}/${componentName}.jsx`,
        componentTemplate(componentName)
      ),
      /** Tests */
      writeFile(
        `${componentPath}/${componentName}/__tests__/${componentName}.test.js`,
        testTemplate(componentName)
      ),
      /** Sass File */
      writeFile(
        `${componentPath}/${componentName}/__themes__/${componentName}.scss`,
        scssTemplate(componentName)
      ),
      /** Fixture File */
      writeFile(
        `${componentPath}/${componentName}/__fixtures__/${componentName}.fixture.js`,
        fixtureTemplate(componentName)
      ),
      /** package.json File */
      writeFile(
        `${componentPath}/${componentName}/package.json`,
        packageJsonTemplate(componentName, dependencies, devDependencies)
      )
    ]);
  } catch (err) {
    console.error(chalk.red(err + '\n'));
    console.log(
      chalk.red(
        `Component ${componentName} could not be built! Please check the above error log.\n`
      )
    );
    process.exit(1);
  }
  console.log(
    chalk.green(
      `Component ${componentName} was created succesfully! \nIt can be found at: '${componentPath}/${componentName}'.`
    )
  );
})();
