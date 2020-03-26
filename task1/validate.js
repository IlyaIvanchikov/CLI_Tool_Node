const program = require('commander');
const colors = require('colors');
const { encode, decode } = require('./cipher');

module.exports = ({ shift, action }) => {
  if (shift === undefined) {
    process.stderr.write(colors.red('Данные о смещении не переданы'));
    process.exit(1);
  } else if (
    action === undefined ||
    (action !== 'decode' && action !== 'encode')
  ) {
    process.stderr.write(
      colors.red('Данные о кодировании/декодировании не получены корректно')
    );
    process.exit(2);
  }
};
