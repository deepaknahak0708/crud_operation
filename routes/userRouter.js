const express = require('express');
const router = express.Router();


//----------------------- controller-----------------------------
const {
   getAllUser, getUserById, updateUser, deleteUser, uploadUserImg, uploadResume, uploadeVideo, multerImg
} = require('../controller/userController');


// -------------------------------middleware------------------------
const authorization = require('../middleware/jwtAuth');
const upload = require('../middleware/upload')


const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next).catch(error => { next(error) }))
}

router.get('/', authorization(["user", "admin"]), use(getAllUser));
// router.get('/', getAllUser);
router.get('/:id', authorization(["admin", "user"]), use(getUserById));
router.put('/:id', authorization(["admin"]), use(updateUser));
router.delete('/:id', authorization(["admin"]), use(deleteUser))


//img, pdf, video  uploading------
// router.post('/userimg', authorization(["admin"]), use(uploadUserImg) )
router.post('/userimg', uploadUserImg);
router.post('/userresume', uploadResume);
router.post('/userresume', uploadeVideo);


// multer -------------
router.post('/multerimg', authorization(["admin", "user"]), upload.single('image'), multerImg)


module.exports = router