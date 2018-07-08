// @flow
module.exports = {
  capitalize: (string: string) => string.replace(/\b\w/g, l => l.toUpperCase())
};
