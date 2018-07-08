// @flow
const { logError } = require('../utils/logger.js');
const inquirer = require('inquirer');
const chalk = require('chalk');

const defaultArgs = require('../args/default');

/**
 * @param  {Object} options
 * @returns Array
 */
const createQuestions = (options: Object): Array<Object> => {
  const questions = [
    {
      type: 'input',
      name: 'componentName',
      message: chalk.magenta('Please enter a component name'),
      when: () => !options.componentName,
      validate: compName =>
        compName ? true : 'must be longer than 0 characters'
    },
    {
      type: 'input',
      name: 'componentPath',
      message: chalk.magenta(
        `Please enter a folder path for the new component`
      ),
      when: () => !options.componentPath,
      default: defaultArgs.componentPath
    }
  ];

  return questions;
};

/**
 * @param  {Object} options
 * @returns Object
 */
const promptUser = async (options: Object): Object => {
  const questions = createQuestions(options);

  let answers;

  try {
    answers = await inquirer.prompt(questions);
  } catch (err) {
    logError(err);
  }

  // default options + override with answers
  return { ...options, ...answers };
};

module.exports = promptUser;
