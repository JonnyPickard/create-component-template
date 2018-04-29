const { exec } = require('child_process');
const rimraf = require('rimraf');
const exitHook = require('exit-hook');

// Delete ./dist on exit
exitHook(() => {
  try {
    rimraf.sync('./dist');
  } catch (e) {
    console.log('e', e);
  }
});

// Compile / Remove flow
exec(
  'node node_modules/.bin/flow-remove-types ./src/ -d ./dist/ --all --pretty',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    // Require / run the compiled script
    require('./dist/create-component-template');
  }
);
