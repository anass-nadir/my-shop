const mongoose = require('mongoose');
const { populateProductsWithCategories, populateUsers } = require('./seeds');

mongoose.connect(`mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

Promise.all([populateProductsWithCategories(), populateUsers()])
  .then((responses) => {
    console.table(responses);
    mongoose.connection.close();
  })
  .catch((errors) => console.table(errors));
