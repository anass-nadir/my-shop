it('adds new products', async () => {
  const cookie = global.signIn();
  const { body } = await global.addCategory(cookie).expect(201);
  const product = {
    categoryId: body?.category._id
  };

  const response = await global.addProduct(cookie, product).expect(201);

  expect(response.body.message).toEqual('Product added!');
});

it('returns category not found error', async () => {
  const cookie = global.signIn();
  const response = await global.addProduct(cookie).expect(404);
  expect(response.body.errors[0]?.message).toEqual(
    'Category not found please try adding it first!'
  );
});
