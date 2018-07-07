#!/usr/bin/env node

/*
This is a React component generator script. It will generate the basic layout of a component for you.

For ease of use this should run via the package.json scripts section.

This will output the resulting folder structure:

a)  ComponentName
b)    ├── ComponentName.js
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
const mkdirp = require('mkdirp-promise');

const { logInfo, logSuccess, logError } = require('./lib/utils/logger');

const cliArgs = require('./lib/args/parser');
const promptUser = require('./lib/user-prompt/prompt');
const mapConfigWithTemplates = require('./lib/config/parser');

const writeFile = util.promisify(fs.writeFile);

(async function createComponent() {
  let componentName;
  let componentPath;

  try {
    const { configPath } = cliArgs;

    const userResponse = await promptUser(cliArgs);

    componentName = userResponse.componentName;
    componentPath = userResponse.componentPath;

    const { folders, templates } = await mapConfigWithTemplates(
      configPath,
      componentName,
      componentPath
    );

    logInfo(`Generating Component: ${componentName}`);
    // Make all directories
    await Promise.all(folders.map(folderName => mkdirp(folderName)));
    // Make all files
    await Promise.all(
      templates.map(({ templatePath, filePath }) =>
        writeFile(filePath, require(templatePath)(componentName))
      )
    );
  } catch (err) {
    logError(err);
    logError(
      `Component ${componentName} could not be built! Please check the above error log.\n`
    );
  } finally {
    logSuccess(
      `Component ${componentName} was created succesfully! \nIt can be found at: '${componentPath}/${componentName}'.`
    );
  }
})();
