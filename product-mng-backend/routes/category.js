const express = require("express");
const { getCategories } = require("../controllers/category/get");
const { createCategory } = require("../controllers/category/create");

const router = express.Router();


router.post('/', createCategory);
router.get('/',getCategories)


module.exports = router;
