const router = require('express').Router();
const controller = require('../controllers/runner.controller');
const { authMiddleware } = require('../middlewares');

// runner의 모든 api는 우선 권한체크부터 함
router.use(authMiddleware);

// shopper가 runner의 order에 요청하기 위한 모든 runner들의 요청 리스트
router.get('/orders', controller.getOrders);
router.get('/orders/:orderId', controller.getOrderById);
router.post('/orders', controller.createOrder);
// delete 시에 연관되는 모든 테이블에 update 기능 필요함
router.delete('/orders/:orderId', controller.deleteOrder);

// runner가 shopper에 요청한 리스트
router.get('/requests', controller.getRequests);

// shopper가 runner order에 요청을 보냄
router.post('/orders/:orderId/requests', controller.createOrderRequest);
// order에 shopper가 요청한 리스트 조회
router.get('/orders/:orderId/requests', controller.getOrderRequests);
// order에 요청한 특정 request 조회
router.get('/orders/requests/:requestId', controller.getOrderRequestById);
// 특정 request의 현재 상태를 변경함
router.put('/orders/requests/:requestId', controller.updateOrderRequest);
// 특정 request 삭제
router.delete('/orders/requests/:requestId', controller.deleteOrderRequest);

module.exports = router;
