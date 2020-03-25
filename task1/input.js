const colors = require('colors');
const text = 'This is secret. Message about symbol!';

// eslint-disable-next-line func-names
// eslint-disable-next-line prettier/prettier
module.exports = function () {
  console.log('Caesar cipher CLI tool');
  console.log('------------------');
  console.log('%s', colors.red(text));
};
