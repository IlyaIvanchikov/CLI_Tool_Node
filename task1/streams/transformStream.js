const fs = require('fs');
const colors = require('colors');
const { decode, encode } = require('../cipher');
module.exports = function transformStream(action) {
    if (action === "encode") {
        encode();
    }
    else if (action === "decode") {
        decode();
    }
};
