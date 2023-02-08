const Router = require('express');
const router = new Router();
const feedController = require('../controllers/feedController');

router.post('/', feedController.getPosts);

module.exports = router;