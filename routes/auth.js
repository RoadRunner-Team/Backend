const router = require('express').Router();
const controller = require('../controllers/auth.controller');

// POST /auth/join
router.post('/join', controller.join);

// POST /auth/login
router.post('/login', controller.login);

// POST /auth/verifyToken
router.post('/verifyToken', controller.verifyToken);

module.exports = router;
