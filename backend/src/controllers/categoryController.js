const { Category } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Récupère toutes les catégories de la base de données.
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

/**
 * Récupère une catégorie spécifique par ID.
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
});

/**
 * Crée une nouvelle catégorie avec les données fournies.
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
});

/**
 * Met à jour une catégorie existante identifiée par son ID avec les données fournies.
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  category.name = name || category.name;
  await category.save();
  res.json(category);
});

/**
 * Supprime une catégorie identifiée par son ID.
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  await category.destroy();
  res.status(204).send(); // Renvoie 204 No Content
});