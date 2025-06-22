const category = require("../../models/category");

exports.getCategories = async (req, res) => {
  const categories = await category.find().sort({ name: 1 });
  res.json(categories);
};