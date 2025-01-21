const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validateCustomer, validateCustomerUpdate } = require('../middleware/validationMiddleware');

// Route pour créer un nouveau client
router.post('/', validateCustomer, customerController.createCustomer);

// Autres routes...
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', validateCustomerUpdate, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;