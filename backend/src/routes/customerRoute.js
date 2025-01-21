const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validateCustomer, validateCustomerUpdate } = require('../middleware/validationMiddleware');

// Routes from customerController
router.post('/', validateCustomer, customerController.createCustomer);

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', validateCustomerUpdate, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;