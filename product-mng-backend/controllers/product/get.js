const product = require("../../models/product");

exports.getProducts = async (req, res) => {
  try {
    const { search, subCategoryId, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) query.title = new RegExp(search, "i");
    if (subCategoryId) query.subCategoryId = subCategoryId;

    const skip = (page - 1) * limit;
    const total = await product.countDocuments(query);
    const products = await product.find(query).skip(skip).limit(parseInt(limit));

    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};
