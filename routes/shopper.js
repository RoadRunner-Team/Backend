const router = require('express').Router();
const controller = require('../controllers/shopper.controller');
const { authMiddleware } = require('../middlewares');

// shopper의 모든 api는 우선 권한체크부터 함
router.use(authMiddleware);

router.get('/orders', controller.getOrders);
router.get('/orders/:orderId', controller.getOrderById);
router.post('/orders', controller.createOrder);
router.delete('/orders/:orderId', controller.deleteOrder);

// shopper가 runner가 올린 order에 요청한 리스트
router.get('/requests', controller.getRequests);

// runner가 shopper의 order에 요청을 보냄
router.post('/orders/:orderId/requests', controller.createOrderRequest);
// shopper가 자신에게 온 runner의 요청리스트를 확인
router.get('/orders/:orderId/requests', controller.getOrderRequests);
router.get('/orders/requests/:requestId', controller.getOrderRequestById);
// shopper가 자신에게 온 runner의 요청을 변경함(매칭완료, 매칭실패, 배달완료, 리뷰완료)
router.put('/orders/requests/:requestId', controller.updateOrderRequest);
router.delete('/orders/requests/:requestId', controller.deleteOrderRequest);

module.exports = router;
