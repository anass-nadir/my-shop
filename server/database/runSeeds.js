const mongoose = require('mongoose');
const { populateProductsWithCategories, populateUsers } = require('./seeds');

if (process.env.NODE_ENV === 'production') {
  console.warn(
    'oww hold on, I made this one just for development and testing stages'
  );
  process.exit(0);
}
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.dropDatabase((err) => {
  if (err) throw new Error(err.message);
  Promise.all([populateProductsWithCategories(), populateUsers()])
    .then((responses) => {
      console.table(responses);
    })
    .catch((error) => console.log(error.message))
    .finally(() => mongoose.connection.close());
});
