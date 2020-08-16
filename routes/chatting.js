const router = require('express').Router();
const controller = require('../controllers/chatting.controller');
const { authMiddleware } = require('../middlewares');

router.use(authMiddleware);

router.get('/room', controller.room);
router.post('/joinRoom', controller.joinRoom);
router.get('/loadRoom', controller.loadRoom);
router.get('/loadMessage', controller.loadMessage);
router.post('/sendMessage', controller.sendMessage);

module.exports = router;
