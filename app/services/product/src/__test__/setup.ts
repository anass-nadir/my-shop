/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, Types } from 'mongoose';
import { agent as request, Test } from 'supertest';
import { signTestUser } from '@anass-nadir/my-shop-common';
import { app } from '../app';

import type { IUserJwtPayload } from 'IUser';
import { IProductTestPayload, ICategoryPayload } from 'IProduct';

declare global {
  namespace NodeJS {
    interface Global {
      addCategory(
        cookie: [string] | { payload: IUserJwtPayload; token: string },
        data?: ICategoryPayload
      ): Test;
      signIn(): Promise<[string] | { payload: IUserJwtPayload; token: string }>;
      addProduct(
        cookie: [string] | { payload: IUserJwtPayload; token: string },
        data?: IProductTestPayload
      ): Test;
      attachProductCategory(
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

global.signIn = () =>
  signTestUser(
    process.env.JWT_SECRET!,
    {},
    {
      expiresIn: 10
    },
    process.env.SESSION_NAME!
  );
global.addProduct = (cookie, data) => {
  const productData = Object.assign(
    {},
    {
      name: 'test',
      description: 'test',
      price: 400,
      quantity: 10,
      imagesUrls: ['https://test.jpg'],
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
      imagesUrls: ['https://test.jpg']
    },
    data
  );
  return request(app)
    .post('/api/products/category/create')
    .set('Cookie', cookie as [string])
    .send(categoryData);
};
global.attachProductCategory = (cookie, data) => {
  const payload = Object.assign(
    {},
    {
      _productIds: [new Types.ObjectId().toHexString()],
      _category: new Types.ObjectId().toHexString()
    },
    data
  );
  return request(app)
    .post('/api/products/with-category')
    .set('Cookie', cookie as [string])
    .send(payload);
};
