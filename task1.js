#!/usr/bin/env node
const { program } = require('commander');
const textD = require('./input.js');

program
  .command('text')
  .alias('tt')
  .description('text menu')
  .action(() => {
    textD();
  });

program.parse(process.argv);

// if (program.input) console.log(program.opts());
// console.log('details:');
// if (program.output) console.log('- tesr');
// if (program.action) console.log(`- ${program.actionType}`);
//   .option('-i, --input <type>', 'an input file')
//   .option('-s, --shift <type>', 'a shift')
//   .option('-o, --output <type>', 'an output file')
//   .option('-a, --action <type>', 'an action encode/decode');
