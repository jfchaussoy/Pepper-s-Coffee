const { Coffee, Category } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Récupère tous les cafés, y compris les informations de catégorie.
 */
exports.getAllCoffees = asyncHandler(async (_, res) => {
  const coffees = await Coffee.findAll({
    include: {
      model: Category,
      as: 'category'
    }
  });
  // Ajouter l'URL complète de l'image basée sur la référence
  const coffeesWithImageUrl = coffees.map(coffee => ({
    ...coffee.toJSON(),
    imageUrl: `/images/coffees/${coffee.reference}.webp`
  }));
  res.json(coffeesWithImageUrl);
});

/**
 * Récupère un café spécifique par ID, y compris les informations de catégorie.
 */
exports.getCoffeeById = asyncHandler(async (req, res) => {
  const coffee = await Coffee.findByPk(req.params.id, {
    include: {
      model: Category,
      as: 'category'
    }
  });
  if (!coffee) {
    return res.status(404).json({ error: 'Coffee not found' });
  }
  // Ajouter l'URL complète de l'image basée sur la référence
  const coffeeWithImageUrl = {
    ...coffee.toJSON(),
    imageUrl: `/images/coffees/${coffee.reference}.webp`
  };
  res.json(coffeeWithImageUrl);
});

/**
 * Crée une nouvelle entrée de café avec les données fournies.
 */
exports.createCoffee = asyncHandler(async (req, res) => {
  const { 
    name, 
    description, 
    reference, 
    origin_country, 
    price_per_kg, 
    available, 
    category_id 
  } = req.body;

  // Vérifier si la catégorie existe
  const category = await Category.findByPk(category_id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const newCoffee = await Coffee.create({
    name,
    description,
    reference,
    origin_country,
    price_per_kg,
    available,
    category_id
  });

  res.status(201).json(newCoffee);
});

/**
 * Met à jour un café existant identifié par son ID avec les données fournies.
 */
exports.updateCoffee = asyncHandler(async (req, res) => {
  const coffee = await Coffee.findByPk(req.params.id);
  if (!coffee) {
    return res.status(404).json({ error: 'Coffee not found' });
  }

  const { name, description, reference, origin_country, price_per_kg, available, category_id } = req.body;

  if (category_id) {
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    coffee.category_id = category_id;
  }

  if (name) coffee.name = name;
  if (description) coffee.description = description;
  if (reference) coffee.reference = reference;
  if (origin_country) coffee.origin_country = origin_country;
  if (price_per_kg) coffee.price_per_kg = price_per_kg;
  if (available !== undefined) coffee.available = available;

  await coffee.save();
  res.json(coffee);
});

/**
 * Supprime un café identifié par son ID.
 */
exports.deleteCoffee = asyncHandler(async (req, res) => {
  const coffee = await Coffee.findByPk(req.params.id);
  if (!coffee) {
    return res.status(404).json({ error: 'Coffee not found' });
  }
  await coffee.destroy();
  // Correction : retour de 204 No Content
  res.status(204).send(); // Renvoie 204 No Content
});