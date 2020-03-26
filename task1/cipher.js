const encode = (text, shift) => {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    code = code + +shift;
    out += String.fromCharCode(code);
    return out;
  }
};

const decode = (text, shift) => {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    code = code - +shift;
    out += String.fromCharCode(code);
  }
  return out;
};

module.exports = {
  encode,
  decode
};
