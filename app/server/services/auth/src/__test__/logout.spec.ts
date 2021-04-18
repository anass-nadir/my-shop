// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { app } from '../app';

it('clears the cookie after logging out', async () => {
  await request(app)
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

  const response = await request(app)
    .get('/api/auth/logout')
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')[0]).toEqual(
    'my-shop-sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
