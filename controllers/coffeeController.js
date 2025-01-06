const { Coffee, Category } = require('../models/indexModels');

/**
 * Helper function to construct image URL based on reference.
 * @param {string} reference - The reference number of the coffee.
 * @returns {string} - The URL to the coffee image.
 */
function getImageUrl(reference) {
  return `/images/coffees/${reference}.webp`;
}

/**
 * Fetches all coffees with their associated categories.
 */
exports.getAllCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.findAll({
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    // Ajouter imageUrl basé sur reference
    const coffeesWithImage = coffees.map(coffee => ({
      ...coffee.toJSON(),
      imageUrl: getImageUrl(coffee.reference)
    }));

    res.json(coffeesWithImage);
  } catch (error) {
    console.error('Error fetching coffees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Fetches a coffee by ID with its associated category.
 */
exports.getCoffeeById = async (req, res) => {
  try {
    const coffee = await Coffee.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    if (coffee) {
      const coffeeWithImage = {
        ...coffee.toJSON(),
        imageUrl: getImageUrl(coffee.reference)
      };
      res.json(coffeeWithImage);
    } else {
      res.status(404).json({ error: 'Coffee not found' });
    }
  } catch (error) {
    console.error('Error fetching coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new coffee.
 */
exports.createCoffee = async (req, res) => {
  try {
    const {
      name,
      description,
      reference,
      origin_country,
      price_per_kg,
      available,
      category_id
    } = req.body;

    // Valider les champs requis
    if (!name || !reference || !origin_country || !price_per_kg || !category_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCoffee = await Coffee.create({
      name,
      description,
      reference,
      origin_country,
      price_per_kg,
      available: available !== undefined ? available : false,
      category_id
    });

    const coffeeWithImage = {
      ...newCoffee.toJSON(),
      imageUrl: getImageUrl(newCoffee.reference)
    };

    res.status(201).json(coffeeWithImage);
  } catch (error) {
    console.error('Error creating coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing coffee.
 */
exports.updateCoffee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      reference,
      origin_country,
      price_per_kg,
      available,
      category_id
    } = req.body;

    const coffee = await Coffee.findByPk(id);
    if (!coffee) {
      return res.status(404).json({ error: 'Coffee not found' });
    }

    await coffee.update({
      name: name !== undefined ? name : coffee.name,
      description: description !== undefined ? description : coffee.description,
      reference: reference !== undefined ? reference : coffee.reference,
      origin_country: origin_country !== undefined ? origin_country : coffee.origin_country,
      price_per_kg: price_per_kg !== undefined ? price_per_kg : coffee.price_per_kg,
      available: available !== undefined ? available : coffee.available,
      category_id: category_id !== undefined ? category_id : coffee.category_id
    });

    const updatedCoffee = {
      ...coffee.toJSON(),
      imageUrl: getImageUrl(coffee.reference)
    };

    res.json(updatedCoffee);
  } catch (error) {
    console.error('Error updating coffee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes a coffee.
 */
exports.deleteCoffee = async (req, res) => {
  try {
    const { id } = req.params;
    const coffee = await Coffee.findByPk(id);
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