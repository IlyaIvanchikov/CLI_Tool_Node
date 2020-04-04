const path = require('path');
const fs = require('fs');

const getAll = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', '..', 'data', 'boards.json'),
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

// const toJSON = user => {
//   return {
//     id: user.id,
//     login: user.login,
//     name: user.name,
//     password: user.password
//   };
// };

// const saveUser = async user => {
//   const users = await getAll();
//   await users.push(toJSON(user));
//   return new Promise((resolve, reject) => {
//     fs.writeFile(
//       path.join(__dirname, '..', '..', 'data', 'users.json'),
//       JSON.stringify(users),
//       err => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(users);
//         }
//       }
//     );
//   });
// };

const getBoard = async id => {
  const boards = await getAll();
  return boards.find(item => item.id === id);
};

// const updateUser = async (id, user) => {
//   const users = await getAll();
//   const userId = users.findIndex(item => item.id === id);
//   users[userId] = user;
//   return new Promise((resolve, reject) => {
//     fs.writeFile(
//       path.join(__dirname, '..', '..', 'data', 'users.json'),
//       JSON.stringify(users),
//       err => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(users);
//         }
//       }
//     );
//   });
// };

// const deleteUser = async id => {
//   const users = await getAll();
//   const userId = users.findIndex(item => item.id === id);
//   const test = false;
//   if (userId !== -1) {
//     users.splice(userId, 1);
//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, '..', '..', 'data', 'users.json'),
//         JSON.stringify(users),
//         err => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(users);
//           }
//         }
//       );
//     });
//   }
//   return users;
// };
module.exports = { getAll, getBoard };
