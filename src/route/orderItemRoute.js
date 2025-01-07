const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Define CRUD routes for order items
router.get('/', orderItemController.getAllOrderItems);
router.get('/:id', orderItemController.getOrderItemById);
router.post('/', orderItemController.createOrderItem);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

// Export the router for use in other parts of the application
module.exports = router;