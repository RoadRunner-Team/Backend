const jwt = require('jsonwebtoken');
const ERROR = require('../constants/error');
const { validationResult } = require('express-validator');

const authMiddleware = async (req, res, next) => {
  try {
    // read the token from header or url
    const token = req.headers['authorization'] || req.query.token;

    if (!token) {
      throw new Error('AUTH.INVALID_TOKEN');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;

    next();
  } catch (e) {
    if (e.message === 'jwt expired' || e.message === 'jwt malformed') {
      next(new Error('AUTH.JWT_TOKEN_EXPIRED'));
    } else {
      next(e);
    }
  }
};

// TODO: errorMiddleware 로 적절하게 전달할 방법 찾기
const validationMiddleware = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errorCode: 'COMMON.VALIDATION',
      message: errors.array(),
    });
  } else {
    next();
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         errorCode:
 *           type: string
 *         message:
 *           type: string | array
 */
const errorMiddleware = async (err, req, res, next) => {
  console.error('err!');
  console.error(err);
  // logger.error(err.message);

  let message = ERROR;
  try {
    err.message.split('.').map((v, index) => {
      message = message[v];
    });
  } catch {
    message = ERROR.COMMON.UNKNOWN;
  }

  return res.status(err.status || 500).json({
    success: false,
    errorCode: err.message || 'COMMON.UNKNOWN',
    message,
  });
};

const socketMiddleware = io => {
  return (req, res, next) => {
    req.io = io;
    next();
  };
};

module.exports = {
  authMiddleware,
  validationMiddleware,
  errorMiddleware,
  socketMiddleware,
};
