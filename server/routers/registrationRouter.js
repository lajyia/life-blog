const Router = require('express');
const router = new Router();
const controller = require('../controllers/registrationController');
const {check} = require('express-validator');


router.post('/',[
    check("password", "Password can't be smaller 8 letters").isLength({min: 8}),
    check("nickname", "Nickname can't be smaller 5 lettes and more 10").isLength({min: 5, max: 10}),
    check("linkName", "Link cant'be smaller 5 letters amd more 10").isLength({min: 5, max: 10}),
], controller.addUser );
router.get('/users', controller.getUsers);
router.get('/check/linkname', controller.checkLinkname);
router.get('/check/login', controller.checkLogin);


module.exports = router;