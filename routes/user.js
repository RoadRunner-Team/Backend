const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares');

router.get('/:userId', controller.getUser);
router.put('/', authMiddleware, controller.updateUser);
router.put('/password', authMiddleware, controller.updateUserPassword);
router.delete('/', authMiddleware, controller.deleteUser);

module.exports = router;
