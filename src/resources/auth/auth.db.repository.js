const User = require('../users/user.model');

const getUser = async (login, password) => {
  const user = await User.find({ login, password });
  return user;
};

module.exports = {
  getUser
};
