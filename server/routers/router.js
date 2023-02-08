const Router = require('express');
const router = new Router();
const postRouter = require('./postRouter');

router.get('/post', postRouter);

module.exports = router;