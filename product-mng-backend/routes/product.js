const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/product/create');
const { getProducts } = require('../controllers/product/get');
const { updateProduct } = require('../controllers/product/update');
const { getProductById } = require('../controllers/product/getById');
const upload = require('../middleware/upload');


router.post('/',upload.array('image', 6),  createProduct);
router.put('/:id', upload.array('image', 6),  updateProduct);
router.get('/',getProducts);
router.get('/:id', getProductById); 



module.exports = router;
