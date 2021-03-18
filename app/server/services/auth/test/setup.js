/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

let mongo;
beforeAll(async () => {
  process.env.JWT_SECRET = 'Culpa ex veniam sint est ut mollit.';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.registerUser = async () => {
  const name = 'test';
  const email = 'test@test.com';
  const password = 'password';
  const confirmPassword = 'password';
  const response = await request(app)
    .post('/api/auth/register')
    .send({ name, email, password, confirmPassword })
    .expect(201);

  return response.get('Set-Cookie');
};
