const ProductCategory = require('../models/productCategory');

const getProducts = async (req, res) => {
  await ProductCategory.find()
    .populate('products')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!products) {
        return res
          .status(400)
          .json({ success: false, error: "there's no products" });
      }
      return res.status(200).json({ success: true, data: { products } });
    });
};
const getCategories = async (req, res) => {
  await ProductCategory.find(null, 'title imageUrl').exec((err, categories) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!categories) {
      return res
        .status(400)
        .json({ success: false, error: "there's no categories" });
    }
    return res.status(200).json({ success: true, data: { categories } });
  });
};
module.exports = {
  getProducts,
  getCategories
};
