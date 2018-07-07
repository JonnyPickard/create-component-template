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

const promptUserIfRequired = async (options: Object): Object => {
  const questions = createQuestions(options);

  const answers = await inquirer.prompt(questions);

  const customizedOptions = {
    ...options,
    ...answers
  };

  return customizedOptions;
};

module.exports = promptUserIfRequired;
