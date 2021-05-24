describe('Category Endpoints', () => {
  it('adds new categories', async () => {
    const cookie = await global.signIn();
    const response = await global.addCategory(cookie).expect(201);

    expect(response.body.message).toEqual('Category added!');
  });
});

// eslint-disable-next-line jest/no-export
export {};
