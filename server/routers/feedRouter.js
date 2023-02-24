const Router = require('express');
const router = new Router();
const feedController = require('../controllers/feedController');
const {checkAuth} = require('../middlewares/checkAuth');

router.get('/', checkAuth, feedController.getPosts);
router.post('/like', checkAuth, feedController.likePost);
router.post('/unlike', checkAuth, feedController.unlikePost);
router.get('/user', checkAuth, feedController.getUserInfoById);
router.get('/author', checkAuth, feedController.getAuthorPosts);


module.exports = router;