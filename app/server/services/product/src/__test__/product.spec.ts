describe('Product Endpoints', () => {
  it('adds new products', async () => {
    const cookie = await global.signIn();
    const response = await global.addProduct(cookie).expect(201);

    expect(response.body.message).toEqual('Product added!');
  });

  it('attaches products with category', async () => {
    const cookie = await global.signIn();
    const product1 = await global.addProduct(cookie).expect(201);
    const product2 = await global.addProduct(cookie).expect(201);
    const category = await global.addCategory(cookie).expect(201);
    const products = {
      _productIds: [product1.body?.product._id, product2.body?.product._id],
      _categoryId: category.body?.category._id
    };
    const response = await global
      .attachProductCategory(cookie, products)
      .expect(200);
    expect(response.body?.value.products).toEqual(
      expect.objectContaining(products._productIds)
    );
  });
});
// eslint-disable-next-line jest/no-export
export {};
