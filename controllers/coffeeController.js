const { Coffee, Category } = require('../models/indexModels');

/**
 * Retrieves all coffees from the database, including their category information.
 */
exports.getAllCoffees = async (_, res) => {
  try {
    const coffees = await Coffee.findAll({
      include: {
        model: Category,
        as: 'category'
      }
    });
    // Add full image URL based on the reference
    const coffeesWithImageUrl = coffees.map(coffee => ({
      ...coffee.toJSON(),
      imageUrl: `/images/coffees/${coffee.reference}.webp`
    }));
    res.json(coffeesWithImageUrl);
  } catch (error) {
    console.error('Error fetching coffees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves a specific coffee by its ID, including category information.
 */
exports.getCoffeeById = async (req, res) => {
  try {
    const coffee = await Coffee.findByPk(req.params.id, {
      include: {
        model: Category,
        as: 'category'
      }
    });
    if (!coffee) {
      return res.status(404).json({ error: 'Coffee not found' });
    }
    // Add full image URL based on the reference
    const coffeeWithImageUrl = {
      ...coffee.toJSON(),
      imageUrl: `/images/coffees/${coffee.reference}.webp`
    };
    res.json(coffeeWithImageUrl);
  } catch (error) {
    console.error('Error fetching coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new coffee entry with the provided data.
 */
exports.createCoffee = async (req, res) => {
  try {
    const { name, description, reference, origin_country, price_per_kg, available, category_id } = req.body;
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
  } catch (error) {
    console.error('Error creating coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing coffee identified by its ID with the provided data.
 */
exports.updateCoffee = async (req, res) => {
  try {
    const { name, description, reference, origin_country, price_per_kg, available, category_id } = req.body;
    const coffee = await Coffee.findByPk(req.params.id);
    if (!coffee) {
      return res.status(404).json({ error: 'Coffee not found' });
    }
    coffee.name = name || coffee.name;
    coffee.description = description || coffee.description;
    coffee.reference = reference || coffee.reference;
    coffee.origin_country = origin_country || coffee.origin_country;
    coffee.price_per_kg = price_per_kg || coffee.price_per_kg;
    coffee.available = available !== undefined ? available : coffee.available;
    coffee.category_id = category_id || coffee.category_id;
    await coffee.save();
    res.json(coffee);
  } catch (error) {
    console.error('Error updating coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes a coffee identified by its ID.
 */
exports.deleteCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findByPk(req.params.id);
    if (!coffee) {
      return res.status(404).json({ error: 'Coffee not found' });
    }
    await coffee.destroy();
    res.json({ message: 'Coffee deleted successfully' });
  } catch (error) {
    console.error('Error deleting coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};