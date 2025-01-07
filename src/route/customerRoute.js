const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Define CRUD routes for customers
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

// Export the router for use in other parts of the application
module.exports = router;