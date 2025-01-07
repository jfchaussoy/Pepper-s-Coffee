const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define CRUD routes for orders
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

// Export the router for use in other parts of the application
module.exports = router;