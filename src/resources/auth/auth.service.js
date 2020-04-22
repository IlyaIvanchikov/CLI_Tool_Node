const authRepo = require('./auth.db.repository');

const getUser = (login, password) => authRepo.getUser(login, password);

module.exports = {
  getUser
};
