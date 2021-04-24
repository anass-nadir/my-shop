// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { app } from '../app';

it('returns the current user when the token is valid', async () => {
  const user = await global.registerUser().expect(201);

  const response = await request(app)
    .get('/api/auth/current-user')
    .set('Cookie', user.get('Set-Cookie'))
    .send()
    .expect(200);

  expect(response.body.user.email).toEqual('test@test.com');
});

it('catches unauthenticated users', async () => {
  const response = await request(app)
    .get('/api/auth/current-user')
    .send()
    .expect(401);
  expect(response.body.user).toBeUndefined();
});
