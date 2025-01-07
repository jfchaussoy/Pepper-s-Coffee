const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CRUD Routes for orders
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
