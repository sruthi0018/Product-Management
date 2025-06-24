const express = require("express");
const { toggleWishlist } = require("../controllers/wishList/addRemove");
const { getWishlist } = require("../controllers/wishList/get");
const router = express.Router();


router.post("/:userId/:productId", toggleWishlist);
router.get('/:userId',getWishlist)


module.exports = router;
