const { readFileSync } = require('fs');
const through = require('through2');

const getStyleRecursive = (variables, key) => {
  if (variables[key] && variables[key].includes('$')) {
    const newKey = variables[key]
      .substring(variables[key].indexOf('$'))
      .split(' ')[0]
      .replace(/[,()!\\]/g, '');
    return variables[key].replace(
      newKey,
      getStyleRecursive(
        variables,
        newKey.replace('$', '').replace(/-./g, (x) => x[1].toUpperCase())
      )
    );
  }

  return variables[key];
};

const getVariables = (variables) => {
  return Object.keys(variables).reduce((result, key) => {
    return {
      ...result,
      [key]: getStyleRecursive(variables, key),
    };
  }, {});
};

module.exports = function scssToJson() {
  return through.obj((chunk, encoding, callback) => {
    const src = readFileSync(chunk.path, encoding)
      .split('\n')
      .filter((value) => value !== '' && !value.startsWith('//'))
      .reduce((result, line) => {
        const [key, value] = line.replace(';', '').split(': ');
        return {
          ...result,
          [key.replace('$', '').replace(/-./g, (x) => x[1].toUpperCase())]: value.split(' //')[0],
        };
      }, {});
    const variables = getVariables(src);
    const dst = chunk.clone();
    dst.contents = new Buffer.from(JSON.stringify(variables, null, '  '));
    return callback(null, dst);
  });
};
