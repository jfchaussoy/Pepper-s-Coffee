// filepath: /src/routes/orderItemRoute.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Définir les routes CRUD pour les order-items
router.get('/', orderItemController.getAllOrderItems);
router.get('/:id', orderItemController.getOrderItemById);
router.post('/', orderItemController.createOrderItem);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;