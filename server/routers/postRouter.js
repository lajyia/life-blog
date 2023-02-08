const Router = require('express');
const router = new Router();
const controller = require('../controllers/postController');

router.post('/delete', controller.deletePost);
router.post('/read', controller.readPost);
router.post('/create', controller.createPost);
router.post('/update', controller.updatePost);

module.exports = router;