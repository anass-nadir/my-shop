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
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'test',
      email: 'test@test.com',
      phone: '+212644444444',
      gender: 'm',
      address: 'xxxx',
      town: 'xxxx',
      country: 'xxxx',
      password: 'password',
      confirmPassword: 'password'
    })
    .expect(201);

  return response.get('Set-Cookie');
};
