const path = require('path');
const fs = require('fs');

const getAll = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', '..', 'data', 'users.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      }
    );
  });
};

const toJSON = user => {
  return {
    id: user.id,
    login: user.login,
    name: user.name,
    password: user.password
  };
};

const saveUser = async user => {
  const users = await getAll();
  await users.push(toJSON(user));
  console.log(users);
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '..', '..', 'data', 'users.json'),
      JSON.stringify(users),
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      }
    );
  });
};

const getUser = async id => {
  const users = await getAll();
  return users.find(item => item.id === id);
};

const updateUser = async (id, user) => {
  const users = await getAll();
  const userId = users.findIndex(item => item.id === id);
  users[userId] = user;
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '..', '..', 'data', 'users.json'),
      JSON.stringify(users),
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      }
    );
  });
};

module.exports = { getAll, saveUser, getUser, updateUser };
