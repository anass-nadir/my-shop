const { User } = require('../../models');
const { mockUsers } = require('../mocks');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let usersPromises = [];
    const save = ({ name, email, password }) => {
      console.log(`<<<< Adding user ${name} >>>>`);
      return new Promise((res, rej) => {
        const user = new User({ name, email, password });
        user.save((err) => {
          if (err) rej(err.message);
          console.log(`<<<< User ${user.name} added successfully >>>>`);
          res(user._id);
        });
      });
    };
    try {
      for (user of mockUsers) {
        usersPromises.push(save(user));
      }
      await Promise.all(usersPromises);
      resolve('**** Users populated successfully ****');
    } catch (error) {
      reject(error.message);
    }
  });
};
