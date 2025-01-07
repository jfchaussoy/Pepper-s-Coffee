const { Customer } = require('../models/indexModels');
const bcrypt = require('bcrypt');

/**
 * Retrieves all customers from the database.
 */
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves a specific customer by its ID.
 */
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new customer with the provided data.
 */
exports.createCustomer = async (req, res) => {
  try {
    const { email, password, address } = req.body;
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      email,
      password: hashedPassword,
      address,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing customer identified by its ID with the provided data.
 */
exports.updateCustomer = async (req, res) => {
  try {
    const { email, password, address } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    if (email) customer.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      customer.password = hashedPassword;
    }
    if (address) customer.address = address;
    await customer.save();
    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes a customer identified by its ID.
 */
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    await customer.destroy();
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};