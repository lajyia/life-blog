const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        if (req.baseUrl == "/api/post"){
            cb(null, 'uploads/posts');
        }
        if (req.baseUrl == "/api/profile"){
            cb(null, 'uploads/users')
        }
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})


const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true);
        }
        else{
            console.log('u can upload only jpg, png, jpeg files');
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


module.exports = upload