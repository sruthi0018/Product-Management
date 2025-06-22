const subCategory = require('../../models/subCategory');

exports.getSubCategories = async (req, res) => {
  const subcategories = await subCategory.find().populate('categoryId', 'name').sort({ name: 1 });
  res.json(subcategories);
};