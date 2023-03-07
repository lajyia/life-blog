const Router = require('express');
const commentsController = require('../controllers/commentsController');
const {checkAuth} = require('../middlewares/checkAuth');


const router = new Router();

router.get('/', checkAuth, commentsController.getComments);
router.post('/add', checkAuth, commentsController.addComment);
router.post('/remove', checkAuth, commentsController.removeComment);


module.exports = router;