const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {

        const title = req.body.title;
        const body = req.body.body;

        const newTitle = req.body.newTitle;
        const newBody = req.body.newBody;

        if (newTitle && newBody && newBody.length > 5 && newTitle.length > 5 && newTitle.length < 41){
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
        }else{
            callback(null, false);
        }
    

        if (title && body && title.length > 5 && title.length < 41 && body.length > 5){
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
        }else{
            callback(null, false);
        }

    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


module.exports = upload