const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController');

// Define CRUD routes for coffees
router.get('/', coffeeController.getAllCoffees);
router.get('/:id', coffeeController.getCoffeeById);
router.post('/', coffeeController.createCoffee);
router.put('/:id', coffeeController.updateCoffee);
router.delete('/:id', coffeeController.deleteCoffee);

// Export the router for use in other parts of the application
module.exports = router;