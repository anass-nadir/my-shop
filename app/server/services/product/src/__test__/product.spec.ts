// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { Types } from 'mongoose';
import { app } from '../app';

it('adds new products', async () => {
  const category = await global.addCategory();
  const user = global.signIn();
  const response = await request(app)
    .post('/api/products/create')
    .set('Cookie', user)
    .send({
      categoryId: category._id,
      name: 'test',
      description: 'test',
      price: 400,
      quantity: 10,
      imageUrl: 'https://test.jpg',
      details: [{ color: 'red' }, { size: 's' }]
    })
    .expect(201);

  expect(response.body.message).toEqual('Product added!');
});

it('returns category not found error', async () => {
  const user = global.signIn();
  const response = await request(app)
    .post('/api/products/create')
    .set('Cookie', user)
    .send({
      categoryId: new Types.ObjectId().toHexString(),
      name: 'test',
      description: 'test',
      price: 400,
      quantity: 10,
      imageUrl: 'https://test.jpg',
      details: [{ color: 'red' }, { size: 's' }]
    })
    .expect(404);
  expect(response.body.errors[0]?.message).toEqual(
    'Category not found please try adding it first!'
  );
});
