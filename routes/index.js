const { version } = require('../package.json');
const errorMiddleware = require('../middlewares').errorMiddleware;

const router = require('express').Router();
const auth = require('./auth');
const upload = require('./upload');
const user = require('./user');
const shopper = require('./shopper');
const runner = require('./runner');
const board = require('./board');
const chatting = require('./chatting');

router.use('/auth', auth);
router.use('/upload', upload);
router.use('/user', user);
router.use('/shopper', shopper);
router.use('/runner', runner);
router.use('/board', board);
router.use('/chatting', chatting);

/**
 * @swagger
 * paths:
 *   /version:
 *     get:
 *       description: API 버전 - package.json의 내용을 기반으로 한다.
 *       summary: API 버전
 *       operationId: APIversion
 *       responses:
 *         200:
 *           description: user data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   version:
 *                     type: number
 *                     example: 1.0.0
 */

router.get('/version', (req, res) => {
  return res.json({ version });
});

router.use(errorMiddleware);

module.exports = router;
