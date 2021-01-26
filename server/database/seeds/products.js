const { Product, ProductCategory } = require('../../models');
const { mockProducts } = require('../mocks');

const createProductsCategory = (category) => {
  return new Promise(async (resolve, reject) => {
    let productsArray = [];
    const save = ({ name, price, imageUrl }) => {
      console.log(`<<<< Adding product ${name} >>>>`);
      return new Promise((res, rej) => {
        const newProduct = new Product({ name, price, imageUrl });
        newProduct.save((err) => {
          if (err) throw new Error(err.message);
          console.log(
            `<<<< Product ${newProduct.name} added successfully >>>>`
          );
          res(newProduct._id);
        });
      });
    };

    for (product of category.items) {
      const productId = await save(product);
      productsArray.push(productId);
    }
    createCategory(category.title, category.imageUrl, productsArray, resolve);
    //     resolve(productsArray);
  });
};
const createCategory = (title, imageUrl, products, done) => {
  const category = new ProductCategory({ title, imageUrl, products });
  category.save((err) => {
    if (err) throw new Error(err.message);
    console.log(`<<<< Category ${title} added successfully >>>>`);
    done();
  });
};

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    for (category of mockProducts) {
      console.log(`<<<< Adding category ${category.title} >>>>`);
      await createProductsCategory(category);
    }
    resolve('**** Products and categories populated successfully ****');
  });
};
