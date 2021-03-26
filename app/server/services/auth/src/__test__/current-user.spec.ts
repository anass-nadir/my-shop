// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { app } from '../app';

it('returns the current user when the token is valid', async () => {
  const cookie = await global.registerUser();

  const response = await request(app)
    .get('/api/auth/current-user')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.user.email).toEqual('test@test.com');
});

it('returns null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/auth/current-user')
    .send()
    .expect(200);
  expect(response.body.user).toBeNull();
});
