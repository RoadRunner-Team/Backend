const express = require('express');
const router = express.Router();
const controller = require('../controllers/board.controller');

// GET /board/:type
router.get('/:type', controller.getBoardListByType);

module.exports = router;
