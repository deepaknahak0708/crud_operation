const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter');
const customerRouter = require('./customerRouter');
const authRouter = require('./authRouter');

//user collection-------
router.use('/user', userRouter);

// product collections----
router.use('/product', productRouter);

// category collections-----
router.use('/category', categoryRouter);

// customer collections -----
router.use('/customer', customerRouter);


// authRoter -------
router.use('/', authRouter);




module.exports = router