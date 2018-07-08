module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'prettier',
    'prettier/flowtype',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['flowtype', 'import', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': [
      1,
      {
        singleQuote: true
      }
    ],
  },
  env: {
    "jest/globals": true
  }
};
