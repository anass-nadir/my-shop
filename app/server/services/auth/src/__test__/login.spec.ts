// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { app } from '../app';

it('fails when the user not found', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
  expect(response.body.success).toBeFalsy();
});

it('fails when the password is incorrect', async () => {
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
    .post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'pass'
    })
    .expect(400);
  expect(response.body?.errors[0]?.message).toEqual('Invalid credentials');
});

it('returns the logged in user with set cookie header when credentials are valid', async () => {
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
    .post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
  expect(response.body).toHaveProperty('user');
});
