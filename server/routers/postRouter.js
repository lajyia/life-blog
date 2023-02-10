const Router = require('express');
const router = new Router();
const controller = require('../controllers/postController');
const {check} = require('express-validator');
const { checkAuth } = require('../middlewares/checkAuth');

router.post('/delete', [
    check("title", "Title can't be smaller 5 and more 40 letters").isLength({min: 5, max: 40}),
    checkAuth
], controller.deletePost);
router.post('/read', [
    check("title", "Title can't be smaller 5 and more 40 letters").isLength({min: 5, max: 40}),
], controller.readPost);
router.post('/create', [
    check("title", "Title can't be smaller 5 and more 40 letters").isLength({min: 5, max: 40}),
    check("body", "Body can't be smaller 5 letters").isLength({min: 5}),
    checkAuth
], controller.createPost);
router.post('/update', [
    check("newTitle", "New title can't be smaller 5 and more 40 letters").isLength({min: 5, max: 40}),
    check("title", "Title can't be smaller 5 and more 40 letters").isLength({min: 5, max: 40}),
    check("newBody", "New body can't be smaller 5 letters").isLength({min: 5}),
    checkAuth
], controller.updatePost);

module.exports = router;