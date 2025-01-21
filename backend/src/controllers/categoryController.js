// Import the Category model from the models directory
const { Category } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Retrieves all categories from the database.
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

/**
 * Retrieves a specific category by its ID.
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
});

/**
 * Creates a new category with the provided data.
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
});

/**
 * Updates an existing category identified by its ID with the provided data.
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  category.name = name || category.name; // Update name if provided, otherwise keep the existing one
  await category.save();
  res.json(category);
});

/**
 * Deletes a category identified by its ID.
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  await category.destroy();
  res.status(204).send(); // Send 204 No Content status
});