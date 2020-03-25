const colors = require('colors');
const text = 'This is secret. Message about symbol!';

module.exports = function () {
  console.log('Caesar cipher CLI tool');
  console.log('------------------');
  console.log('%s', colors.red(text));
};
