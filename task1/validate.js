const colors = require('colors');

module.exports = ({ shift, action }) => {
  if (shift === undefined) {
    process.stderr.write(colors.red('Данные о смещении не переданы'));
    const exit = process.exit;
    exit(1);
  } else if (
    action === undefined ||
    (action !== 'decode' && action !== 'encode')
  ) {
    process.stderr.write(
      colors.red('Данные о кодировании/декодировании не получены корректно')
    );
    const exit = process.exit;
    exit(2);
  }
};
