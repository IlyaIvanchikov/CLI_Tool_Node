const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  getStatusText
} = require('http-status-codes');

const logger = require('./logger');

class Error {
  constructor(status) {
    this.status = status;
    this.text = getStatusText(this.status);
  }
}

const responseForClient = async (error, res) => {
  try {
    if (error === 401) {
      throw new Error(UNAUTHORIZED);
    } else if (error === 400) {
      throw new Error(BAD_REQUEST);
    } else if (error === 404) {
      throw new Error(NOT_FOUND);
    }
  } catch (err) {
    if (!err.status) {
      err = new Error(INTERNAL_SERVER_ERROR);
    }
    logger.error('error', err);
    res.status(err.status).send(err.text);
  }
};

module.exports = responseForClient;
