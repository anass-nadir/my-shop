// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { app } from '../app';

it('returns the logged in user with the cookie header on successful register', async () => {
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
  expect(response.get('Set-Cookie')).toBeDefined();
  expect(response.body).toHaveProperty('user');
});

it('catches the invalid emails', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'test',
      email: 'qweqweq',
      phone: '+212644444444',
      gender: 'm',
      address: 'xxxx',
      town: 'xxxx',
      country: 'xxxx',
      password: 'password',
      confirmPassword: 'password'
    })
    .expect(400);
  expect(response.body?.errors[0].message).toEqual('A valid email is required');
});

it('catches the password mismatch', async () => {
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
      password: 'pass',
      confirmPassword: 'password'
    })
    .expect(400);
  expect(response.body?.errors[0].message).toEqual('Password mismatch');
});

it('catches duplicate emails', async () => {
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
    .expect(400);
  expect(response.body?.errors[0]?.message).toMatch(
    /dup key: { : "test@test.com" }/
  );
});
