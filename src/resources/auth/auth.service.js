const authRepo = require('./auth.db.repository');

const getUser = login => authRepo.getUser(login);

module.exports = {
  getUser
};
