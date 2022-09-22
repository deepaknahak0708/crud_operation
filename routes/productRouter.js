const express = require('express');
const router = express.Router();

const {createProduct, getAllProducts, getProductsByid, updateProduct, deleteProduct , addCategoryId} = require('../controller/productController')
const validator = require('../utils/validation')

router.post('/',validator('product'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductsByid);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


// product through categoryId---------
router.post('/categoryid', addCategoryId);

module.exports = router