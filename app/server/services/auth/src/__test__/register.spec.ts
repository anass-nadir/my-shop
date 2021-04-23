it('returns the logged in user with the cookie header on successful register', async () => {
  const response = await global.registerUser().expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
  expect(response.body).toHaveProperty('user');
});

it('catches the invalid emails', async () => {
  const response = await global
    .registerUser({
      email: 'qweqweq'
    })
    .expect(400);
  expect(response.body?.errors[0].message).toEqual('A valid email is required');
});

it('catches the password mismatch', async () => {
  const response = await global
    .registerUser({
      password: 'pass'
    })
    .expect(400);
  expect(response.body?.errors[0].message).toEqual('Password mismatch');
});

it('catches duplicate emails', async () => {
  await global.registerUser().expect(201);

  const response = await global.registerUser().expect(400);
  expect(response.body?.errors[0]?.message).toMatch(
    /dup key: { : "test@test.com" }/
  );
});
