const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images');
    },

    filename:(req, file, cb)=>{
        const fileName = Date.now().valueOf() + file.originalname;
        cb(null, fileName);
    }
});


const fileFilter = (req, file, cb)=>{
   if(file.mimetype === "image/jpeg"  || file.mimetype === "image/png"){
    cb(null, true)
   }else{
    cb(new Error('Invalid file type '));
   }
}

const upload = multer({storage:storage, fileFilter:fileFilter});

module.exports = upload