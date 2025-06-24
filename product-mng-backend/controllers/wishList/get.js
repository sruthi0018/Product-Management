
const mongoose = require('mongoose');
const wishList = require('../../models/wishList');


exports.getWishlist = async (req, res) => {
  try {
    const {userId} = req.params;

   const wishlist = await wishList.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate("productIds");

    if (!wishlist) return res.json({ products: [] });

    res.json({ products: wishlist.productIds });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};