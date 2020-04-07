const encode = (text, shift) => {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90)) {
      code = code + +shift;
      out += String.fromCharCode(code);
    } else out += String.fromCharCode(code);
  }
  return out;
};

const decode = (text, shift) => {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90)) {
      code = code - +shift;
      out += String.fromCharCode(code);
    } else out += String.fromCharCode(code);
  }
  return out;
};

module.exports = {
  encode,
  decode
};
