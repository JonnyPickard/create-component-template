// @flow

const { logError } = require('../utils/logger.js');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { capitalize } = require('../utils/helpers');

const createQuestions = options => {
  const questions = [
    {
      type: 'input',
      name: 'componentName',
      message: chalk.magenta('Please enter a component name capitalized'),
      when: () => !options.componentName
    },
    {
      type: 'input',
      name: 'componentPath',
      message: chalk.magenta(
        `Please enter a folder path for the new component`
      ),
      when: () => !options.componentPath
    }
  ];

  return questions;
};

// capitalize(result.componentName);

module.exports = async function promptUserIfRequired(options: Object): Object {
  const questions = createQuestions(options);

  const answers = await inquirer.prompt(questions);

  return answers;
};
