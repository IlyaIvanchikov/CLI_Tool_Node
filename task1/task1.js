/* eslint-disable node/shebang */
const program = require('commander');
const { Transform } = require('stream');
const validate = require('./validate');
const readableStream = require('./streams/readableStream');
const transformStream = require('./streams/transformStream');
// const fs = require('fs');
// const cipher = require('./cipher');

program
  .storeOptionsAsProperties(false)
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');
program.parse(process.argv);

const opt = program.opts();
validate(opt);

const readStream = readableStream(opt.input);
console.log(readStream.chunk.toString('utf8'));
// const transformStream = transformStream(opt.action);

// const fileContent = fs.readFileSync(
//   program.input,
//   'utf8',
//   (error, data) => {
//     console.log('Асинхронное чтение файла');
//     if (error) throw error;
//     console.log(data);
//   }
// );
// const cipherNew = cipher(fileContent, program.shift, program.opts().action);
// fs.writeFile('output.txt', cipherNew, error => {
//   if (error) throw error;
//   console.log('Асинхронная запись файла завершена. Содержимое файла:');
//   const data = cipherNew;
//   console.log(data);
// });
