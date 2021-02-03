const { Product, ProductCategory } = require('../../models');
const { mockProducts } = require('../mocks');

const createProductsCategory = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`<<<< Adding category ${category.title} >>>>`);
      let productsPromises = [];
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
        productsPromises.push(save(product));
      }
      const productsArray = await Promise.all(productsPromises);
      createCategory(category.title, category.imageUrl, productsArray, resolve);
    } catch (error) {
      reject(error.message);
    }
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
    try {
      let categoriesPromises = [];
      for (category of mockProducts) {
        categoriesPromises.push(createProductsCategory(category));
      }

      await Promise.all(categoriesPromises);
      resolve('**** Products and categories populated successfully ****');
    } catch (error) {
      reject(error.message);
    }
  });
};
