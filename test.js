// First check for -c
// Second check package.json
// Third check root path
// Fourth use default

try {
  require('./fake.js');
} catch (e) {
  console.log('e', e);
}
