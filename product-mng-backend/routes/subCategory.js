const express = require("express");
const { createSubCategory } = require("../controllers/subCategory/create");
const { getSubCategories } = require("../controllers/subCategory/get");

const router = express.Router();


router.post('/', createSubCategory);
router.get('/',getSubCategories)


module.exports = router;
