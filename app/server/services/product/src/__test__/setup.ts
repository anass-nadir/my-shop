/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, Types } from 'mongoose';
import { agent as request, Test } from 'supertest';
import { signTestUser } from '@anass-nadir/my-shop-common';
import { app } from '../app';

import { IUserJwtPayload } from 'IUser';
import { ICategorySchema } from 'ICategory';
import { IProductTestPayload } from 'IProduct';

declare global {
  namespace NodeJS {
    interface Global {
      addCategory(
        cookie: [string] | { payload: IUserJwtPayload; token: string },
        data?: ICategorySchema
      ): Test;
      signIn(): [string] | { payload: IUserJwtPayload; token: string };
      addProduct(
        cookie: [string] | { payload: IUserJwtPayload; token: string },
        data?: IProductTestPayload
      ): Test;
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
  return signTestUser(process.env.JWT_SECRET!, process.env.SESSION_NAME!, {
    expiresIn: 10
  });
};
global.addProduct = (cookie, data) => {
  const productData = Object.assign(
    {},
    {
      categoryId: new Types.ObjectId().toHexString(),
      name: 'test',
      description: 'test',
      price: 400,
      quantity: 10,
      imageUrl: 'https://test.jpg',
      details: [{ color: 'red' }, { size: 's' }]
    },
    data
  );
  return request(app)
    .post('/api/products/create')
    .set('Cookie', cookie as [string])
    .send(productData);
};
global.addCategory = (cookie, data) => {
  const categoryData = Object.assign(
    {},
    {
      title: 'test',
      slug: 'test',
      imageUrl: 'https://test.jpg'
    },
    data
  );
  return request(app)
    .post('/api/products/create-category')
    .set('Cookie', cookie as [string])
    .send(categoryData);
};
