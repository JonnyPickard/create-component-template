const yargs = require('yargs');

const { configPath, componentName, componentPath } = require('./default-args');

const argv = yargs.command(' ', 'Scaffolds a new component via user prompt unless cli args are specified. See --help for more details.').option({
  config: {
    alias: 'c',
    describe: 'Path to a config file'
  }
}).option({
  name: {
    alias: 'n',
    describe: 'Name of the component'
  }
}).option({
  path: {
    alias: 'p',
    describe: 'Path to create the component at'
  }
}).option({
  dependencies: {
    alias: 'd',
    describe: 'If specified will enable dependencies prompt'
  }
}).help().argv;

module.exports = {
  configPath: argv.config || argv.c || configPath,
  componentName: argv.name || argv.n || componentName,
  componentPath: argv.path || argv.p || componentPath,
  dependenciesRequested: argv.dependencies || argv.d
};