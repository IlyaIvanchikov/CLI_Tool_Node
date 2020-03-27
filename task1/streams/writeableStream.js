const fs = require('fs');
const colors = require('colors');
module.exports = function writeableStream(output) {
  if (fs.existsSync(output)) {
    return fs.createWriteStream(output, {
      flags: 'a'
    });
  } else if (!output) {
    return process.stdout;
  }

  process.stderr.write(
    colors.red(
      'Введенный вами файл не существует, проверьте корректность данных'
    )
  );
  process.exit(1);
};
