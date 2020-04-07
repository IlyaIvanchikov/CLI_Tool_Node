const fs = require('fs');
const colors = require('colors');
module.exports = function readableStream(input) {
  if (fs.existsSync(input)) {
    return fs.createReadStream(input);
  } else if (!input) {
    process.stdout.write('Введите текст: ');
    return process.stdin;
  }

  process.stderr.write(
    colors.red(
      'Введенный вами файл не существует, проверьте корректность данных'
    )
  );
  const exit = process.exit;
  exit(1);
};
