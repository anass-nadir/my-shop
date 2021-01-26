const ProductCategory = require('../models/productCategory');

const getProducts = (req, res) => {
  try {
    ProductCategory.find()
      .populate('products')
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
        if (!products) {
          return res
            .status(400)
            .json({ success: false, error: "there's no products" });
        }
        return res.status(200).json({ success: true, data: { products } });
      });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
const getCategories = (req, res) => {
  try {
    ProductCategory.find(null, 'title imageUrl').exec((err, categories) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      if (!categories) {
        return res
          .status(400)
          .json({ success: false, error: "there's no categories" });
      }
      return res.status(200).json({ success: true, data: { categories } });
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
module.exports = {
  getProducts,
  getCategories
};
