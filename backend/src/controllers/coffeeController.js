// Import Coffee and Category models from the models directory
const { Coffee, Category } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Retrieves all coffees, including category information.
 */
exports.getAllCoffees = asyncHandler(async (_, res) => {
  const coffees = await Coffee.findAll({
    include: {
      model: Category,
      as: 'category'
    }
  });
  // Add the complete image URL based on the reference
  const coffeesWithImageUrl = coffees.map(coffee => ({
    ...coffee.toJSON(),
    imageUrl: `/images/coffees/${coffee.reference}.webp`
  }));
  res.json(coffeesWithImageUrl);
});

/**
 * Retrieves a specific coffee by ID, including category information.
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
  // Add the complete image URL based on the reference
  const coffeeWithImageUrl = {
    ...coffee.toJSON(),
    imageUrl: `/images/coffees/${coffee.reference}.webp`
  };
  res.json(coffeeWithImageUrl);
});

/**
 * Creates a new coffee entry with the provided data.
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

  // Check if the category exists
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
 * Updates an existing coffee identified by its ID with the provided data.
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
 * Deletes a coffee identified by its ID.
 */
exports.deleteCoffee = asyncHandler(async (req, res) => {
  const coffee = await Coffee.findByPk(req.params.id);
  if (!coffee) {
    return res.status(404).json({ error: 'Coffee not found' });
  }
  await coffee.destroy();
  res.status(204).send(); // Return 204 No Content
});