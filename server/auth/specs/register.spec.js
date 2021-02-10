const request = require('supertest');
const app = require('../app');

it('returns the logged in user with the cookie header on successful register', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'test',
      email: 'test@test.com',
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
      password: 'password',
      confirmPassword: 'password'
    })
    .expect(400);
  expect(response.body?.errors[0].msg).toEqual('A valid email is required');
});

it('catches the password mismatch', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'test',
      email: 'test@test.com',
      password: 'pass',
      confirmPassword: 'password'
    })
    .expect(400);
  expect(response.body?.errors[0].msg).toEqual('Password mismatch');
});

it('catches duplicate emails', async () => {
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'test',
      email: 'test@test.com',
      password: 'password',
      confirmPassword: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'test',
      email: 'test@test.com',
      password: 'password',
      confirmPassword: 'password'
    })
    .expect(400);
  expect(response.body.error).toMatch(/dup key: { : "test@test.com" }/);
});
