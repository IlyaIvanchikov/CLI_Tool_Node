const { Transform } = require('stream');
const { decode, encode } = require('../cipher');

module.exports = function transformStream(action, shift) {
  if (action === 'encode') {
    const text = new Transform({
      transform(chunk, enc, callback) {
        this.push(encode(chunk.toString('utf-8'), shift));
        callback();
      }
    });
    return text;
  } else if (action === 'decode') {
    const text = new Transform({
      transform(chunk, enc, callback) {
        this.push(decode(chunk.toString('utf-8'), shift));
        callback();
      }
    });
    return text;
  }
};
