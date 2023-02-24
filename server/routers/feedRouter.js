const Router = require('express');
const router = new Router();
const feedController = require('../controllers/feedController');
const {checkAuth} = require('../middlewares/checkAuth');

router.get('/', checkAuth, feedController.getPosts);
router.post('/like', checkAuth, feedController.likePost);
router.post('/unlike', checkAuth, feedController.unlikePost);
router.get('/author', checkAuth, feedController.getUserInfoById);

module.exports = router;