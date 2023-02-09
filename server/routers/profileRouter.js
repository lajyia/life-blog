const Router = require('express');
const router = new Router();
const controller = require('../controllers/profileController');
const {check} = require('express-validator');

router.post('/', controller.getProfile);
router.post('/delete', controller.deleteProfile);
router.post('/update', controller.updateProfile);
router.post('/login', [
    check("nickname","Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("password", "Password can't be smaller 8 letters").isLength({min: 8})
], controller.loginProfile);

module.exports = router;