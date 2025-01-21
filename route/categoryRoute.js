const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes for category operations
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Export the router for use in other parts of the application
module.exports = router;