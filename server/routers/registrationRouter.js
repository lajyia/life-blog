const Router = require('express');
const router = new Router();
const controller = require('../controllers/registrationController');


router.post('/', controller.addUser );


module.exports = router;