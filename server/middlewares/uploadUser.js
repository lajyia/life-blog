const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const decoded = (req.headers.authorization || "").split(' ')[1];
        let result;
        try {
            result = jwt.verify(decoded, JWT_SECRET);
        }
        catch(e){
            console.log(e)
        }
        const newNickname = req.body.newNickname;
        const password = req.body.password;
    
        if (result && newNickname.length > 4 && newNickname.length < 10 && password.length > 8) {

            if (
                file.mimetype == "image/png" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg"
            ) {
                callback(null, true);
            }
            else {
                console.log('u can upload only jpg, png, jpeg files');
                callback(null, false)
            }
        }
        else{
            callback(null, false)
        }
        
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


module.exports = upload