const Router = require('express');
const router = new Router();
const controller = require('../controllers/profileController');
const {check} = require('express-validator');

router.post('/', [
    check("nickname", "Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10})
], controller.getProfile);

router.post('/delete', [
    check("nickname", "Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10})
], controller.deleteProfile);

router.post('/update', [
    check("linkName", "LinkName can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("newLinkName", "LinkName can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("bio", "Bio can't be more 40 letters").isLength({max: 10}),
], controller.updateProfile);

router.post('/login', [
    check("nickname","Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("password", "Password can't be smaller 8 letters").isLength({min: 8})
], controller.loginProfile);

router.post('/change', [
    check("nickname", "Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("newNickname", "Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("password", "Password can't be smaller 8 lettes").isLength({min: 8}),
],
controller.changeProfile);

module.exports = router;