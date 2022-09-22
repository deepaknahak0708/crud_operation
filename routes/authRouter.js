const express = require('express');
const router = express.Router();

const {registration, login} = require('../controller/authController');
const authorization = require('../middleware/jwtAuth')
const validator = require('../utils/validation')

const use = (fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next).catch(error=>{next(error)}))
}

router.post('/register' ,authorization(['admin']), validator('user'), use (registration));
router.post('/login', login);



// validators----------
// router.post('/register' , ,use (registration));




module.exports = router
