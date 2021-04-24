// eslint-disable-next-line import/no-extraneous-dependencies
import { agent as request } from 'supertest';
import { app } from '../app';

it('clears the cookie after logging out', async () => {
  const user = await global.registerUser().expect(201);

  const response = await request(app)
    .get('/api/auth/logout')
    .set('Cookie', user.get('Set-Cookie'))
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')[0]).toEqual(
    `${process.env.SESSION_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly`
  );
});
