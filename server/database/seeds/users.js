const { User } = require('../../models');
const { mockUsers } = require('../mocks');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    const save = ({ name, email, password }) => {
      console.log(`<<<< Adding user ${name} >>>>`);
      return new Promise((res, rej) => {
        const user = new User({ name, email, password });
        user.save((err) => {
          if (err) throw new Error(err.message);
          console.log(`<<<< User ${user.name} added successfully >>>>`);
          res(user._id);
        });
      });
    };
    for (user of mockUsers) {
      await save(user);
    }
    resolve('**** Users populated successfully ****');
  });
};
