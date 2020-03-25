/* eslint-disable node/shebang */
const program = require('commander');
const fs = require('fs');
const cipher = require('./cipher');
// const textD = require('./input.js');

// program
//   .command('text')
//   .alias('tt')
//   .description('text menu')
//   .action(() => {
//     textD();
//   });

// program.parse(process.argv);

// if (program.input) console.log(program.opts());
// console.log('details:');
// if (program.output) console.log('- tesr');
// if (program.action) console.log(`- ${program.actionType}`);
//   .option('-i, --input <type>', 'an input file')
//   .option('-s, --shift <type>', 'a shift')
//   .option('-o, --output <type>', 'an output file')
//   .option('-a, --action <type>', 'an action encode/decode');
// program.storeOptionsAsProperties(false);
program
  // .arguments('<file>')
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .requiredOption('-a, --action <action>', 'an action encode/decode')
  .action(() => {
    if (program.shift === undefined) {
      process.stderr('hgh');
    }
    const fileContent = fs.readFileSync(
      program.input,
      'utf8',
      (error, data) => {
        console.log('Асинхронное чтение файла');
        if (error) throw error;
        console.log(data);
      }
    );
    const cipherNew = cipher(fileContent, program.shift, program.opts().action);
    fs.writeFile('output.txt', cipherNew, error => {
      if (error) throw error;
      console.log('Асинхронная запись файла завершена. Содержимое файла:');
      const data = cipherNew;
      console.log(data);
    });
    // console.log('shift: %s input: %s', program.shift, program.input);
  })
  .parse(process.argv);
