const User = require('../users/user.model');

const getUser = async login => {
  const user = await User.findOne({ login });
  return user;
};

module.exports = {
  getUser
};
