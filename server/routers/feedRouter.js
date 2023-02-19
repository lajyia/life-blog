const Router = require('express');
const router = new Router();
const feedController = require('../controllers/feedController');
const {checkAuth} = require('../middlewares/checkAuth');

router.get('/', checkAuth, feedController.getPosts);

module.exports = router;