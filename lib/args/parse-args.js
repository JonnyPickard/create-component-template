const yargs = require('yargs');

module.exports = yargs
  .command(
    ' ',
    'scaffolds a new component via user prompt unless cli args are specified see --help for more details'
  )
  .option({
    config: {
      alias: 'c',
      describe: 'path to a config file'
    }
  })
  .option({
    name: {
      alias: 'n',
      describe: 'name of the component'
    }
  })
  .option({
    path: {
      alias: 'p',
      describe: 'path to create the component at'
    }
  })
  .option({
    dependencies: {
      alias: 'd',
      describe: 'if specified will enable prompt to ask for dependencies'
    }
  })
  .help().argv;

module.exports = {
  configPath: yargs.config || yargs.c || './lib/config/default-config.js',
  componentName: yargs.name || yargs.n || '',
  componentPath: yargs.path || yargs.p || '.',
  dependencies: yargs.dependencies || yargs.d
};
