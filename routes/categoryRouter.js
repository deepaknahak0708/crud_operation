const express = require('express');
const router = express.Router();

const{createData, getCategoryData, getCategoryDataById, updateCategoryData,deleteCategoryData } = require('../controller/categoryRouter');

router.post('/', createData);
router.get('/', getCategoryData);
router.get('/:id', getCategoryDataById );
router.patch('/:id', updateCategoryData);
router.delete('/:id', deleteCategoryData);






module.exports = router