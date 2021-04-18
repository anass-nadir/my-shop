/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, Types } from 'mongoose';
import { agent as request } from 'supertest';
import { signUser } from '@anass-nadir/my-shop-common';
import { app } from '../app';
import { CategoryDoc } from '../models/category';

declare global {
  namespace NodeJS {
    interface Global {
      addCategory(): Promise<CategoryDoc>;
      signIn(): [string];
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

global.signIn = () => {
  const payload = {
    _id: new Types.ObjectId().toHexString(),
    name: 'test',
    email: 'test@test.com'
  };

  const token = signUser(payload, process.env.JWT_SECRET!, {
    expiresIn: 60 * 60 * 24 * 1000
  });

  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`my-shop-sess=${base64}; path=/; httponly`];
};

global.addCategory = async () => {
  const user = global.signIn();
  const response = await request(app)
    .post('/api/products/create-category')
    .set('Cookie', user)
    .send({
      title: 'test',
      slug: 'test',
      imageUrl: 'https://test.jpg'
    })
    .expect(201);
  return response.body?.category;
};
