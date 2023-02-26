const Router = require('express');
const router = new Router();
const {checkAuth} = require('../middlewares/checkAuth');
const subscribersController = require('../controllers/subscribersController');

router.get('/', checkAuth, subscribersController.getSubscribers);
router.post('/follow', checkAuth, subscribersController.follow);
router.post('/unfollow', checkAuth, subscribersController.unfollow);


module.exports = router;