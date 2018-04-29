const chalk = require('chalk');
const prompt = require('prompt');
const semverRegex = require('semver-regex');

/*
  Recursively calls get dependencies untill user says no to more.
 */
module.exports = (dependencyType, dependencies) => new Promise((resolve, reject) => {
  const getDependencies = (dependencyType = 'prod', dependencies = {}) => {
    return prompt.get({
      properties: {
        requireMore: {
          description: chalk.magenta(`Do you require any${Object.keys(dependencies).length > 0 ? ' more' : ''} ${dependencyType === 'prod' ? 'dependencies' : 'devDependencies'}? (n/y)`),
          pattern: /(y|n)/,
          message: 'Answer must be (y) or (n)',
          default: 'n'
        },
        dependency: {
          description: chalk.magenta(`Please enter the ${dependencyType === 'prod' ? 'dependency' : 'devDependency'} name`),
          ask: () => prompt.history('requireMore').value === 'y'
        },
        version: {
          description: chalk.magenta('Please enter a the semantic version number'),
          conform: version => semverRegex().test(version),
          ask: () => prompt.history('requireMore').value === 'y'
        }
      }
    }, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.requireMore === 'y') {
        dependencies[result.dependency] = result.version;
        getDependencies(dependencyType, dependencies);
      } else {
        resolve(dependencies);
      }
    });
  };
  getDependencies(dependencyType, dependencies);
});