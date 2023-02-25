const Router = require('express');
const router = new Router();
const {checkAuth} = require('../middlewares/checkAuth');
const subscribersController = require('../controllers/subscribersController');

router.get('/', checkAuth, subscribersController.getSubscribers)



module.exports = router;