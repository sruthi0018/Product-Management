const WishList = require("../../models/wishList");

exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    let wishlist = await WishList.findOne({ userId });

    if (!wishlist) {
     
      wishlist = new WishList({
        userId,
        productIds: [productId]
      });
    } else {
   
      const index = wishlist.productIds.indexOf(productId);
      if (index > -1) {
        wishlist.productIds.splice(index, 1); // Remove
      } else {
        wishlist.productIds.push(productId); // Add
      }
    }

    await wishlist.save();
    res.json({ message: 'Wishlist updated', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update wishlist', error: error.message });
  }
};