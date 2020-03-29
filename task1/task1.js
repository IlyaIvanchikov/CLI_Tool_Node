const program = require('commander');
const validate = require('./validate');
const colors = require('colors');
const { pipeline } = require('stream');
const readableStream = require('./streams/readableStream');
const transformStream = require('./streams/transformStream');
const writeableStream = require('./streams/writeableStream');

program
  .storeOptionsAsProperties(false)
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv);

const opt = program.opts();
validate(opt);

const readStream = readableStream(opt.input);
const transformStreamInfo = transformStream(opt.action, opt.shift);
const writeStream = writeableStream(opt.output);

pipeline(readStream, transformStreamInfo, writeStream, err => {
  if (err) {
    console.log(colors.red(err));
  } else {
    console.log(colors.green('Успешно'));
  }
});
