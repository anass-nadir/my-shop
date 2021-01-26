const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
).on('open', () => console.info('MongoDB connected'));
module.exports = db;
