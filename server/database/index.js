const mongoose = require('mongoose');
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    connectTimeoutMS: 10000
  })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
).on('open', () => console.info('MongoDB connected'));
module.exports = db;
