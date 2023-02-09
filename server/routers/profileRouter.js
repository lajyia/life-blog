const Router = require('express');
const router = new Router();
const controller = require('../controllers/profileController');

router.post('/', controller.getProfile);
router.post('/delete', controller.deleteProfile);
router.post('/update', controller.updateProfile);
router.post('/login', controller.loginProfile);

module.exports = router;