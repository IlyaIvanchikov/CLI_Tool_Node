module.exports = function cipher(text, shift, action) {
  if (action === 'encode') {
    let out = '';
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt(i);
      code = code + +shift;
      out += String.fromCharCode(code);
    }
    return out;
  } else if (action === 'decode') {
    let out = '';
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt(i);
      code = code - +shift;
      out += String.fromCharCode(code);
    }
    return out;
  }
};
