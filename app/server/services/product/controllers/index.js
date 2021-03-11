const { ProductCategory } = require('../models');

const getProducts = async (req, res) => {
  try {
    const products = await ProductCategory.find().populate('products');

    return res.status(200).json({ success: true, data: { products } });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find(null, 'title imageUrl');
    return res.status(200).json({ success: true, data: { categories } });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
module.exports = {
  getProducts,
  getCategories
};
