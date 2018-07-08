module.exports = componentName => `\
{
  "name": "${componentName} Component",
  "description": "Presentational",
  "version": "0.0.0",
  "main": "./${componentName}.js",
  "files": [
    "./__themes__/${componentName}.scss"
  ]
}
`;
