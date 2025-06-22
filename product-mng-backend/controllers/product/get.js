const product = require("../../models/product");

exports.getProducts = async (req, res) => {
  try {
    const { search, subCategoryId, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) query.title = new RegExp(search, "i");
    if (subCategoryId) query.subCategoryId = subCategoryId;

    const products = await product
      .find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    console.log("products", products);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};
