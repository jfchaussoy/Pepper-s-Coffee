// routes/coffeeRoute.js
const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController');

// Routes for coffees
router.get('/', coffeeController.getAllCoffees);
router.get('/:id', coffeeController.getCoffeeById);
router.post('/', coffeeController.createCoffee);
router.put('/:id', coffeeController.updateCoffee);
router.delete('/:id', coffeeController.deleteCoffee);

module.exports = router;
