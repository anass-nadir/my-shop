/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';
import { agent as request } from 'supertest';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      registerUser(): Promise<string[]>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_SECRET = 'Culpa ex veniam sint est ut mollit.';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

beforeEach(async () => {
  const collections = await connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await connection.close();
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
