const Router = require('express');
const router = new Router();
const controller = require('../controllers/profileController');
const { check } = require('express-validator');
const { checkAuth } = require('../middlewares/checkAuth');


const upload = require('../middlewares/uploadUser');

router.get('/', [
    checkAuth
], controller.getProfile);

router.post('/delete', [
    checkAuth
], controller.deleteProfile);


router.post('/login', [
    check("nickname","Nickname can't be smaller 5 letters and more 10").isLength({min: 5, max: 10}),
    check("password", "Password can't be smaller 8 letters").isLength({min: 8})
], controller.loginProfile);

router.post('/change', [
    checkAuth,
    upload.single("image"),
    check("nickname", "Nickname can't be smaller 5 letters and more 10").isLength({min: 5, max: 10}),
    check("linkname", "LinkName can't be smaller 5 letters and more 10").isLength({min: 5, max: 10}),
    check("bio", "Bio can't be more 40 letters").isLength({max: 40}),
],
controller.changeProfile);

router.get('/avatar', controller.getAvatar);

router.get('/checkme', checkAuth, controller.isMe);


module.exports = router;