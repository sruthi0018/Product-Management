
const SubCategory = require("../../models/subCategory");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subCategory = new SubCategory({ name, categoryId });
    await subCategory.save();

    res.status(201).json({ message: 'SubCategory created', subCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory', error: error.message });
  }
};