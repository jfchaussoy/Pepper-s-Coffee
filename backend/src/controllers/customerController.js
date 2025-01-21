// Import the Customer model from the models directory
const { Customer } = require('../models/indexModels');
const bcrypt = require('bcrypt');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Retrieves all customers from the database.
 */
exports.getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

/**
 * Retrieves a specific customer by ID.
 */
exports.getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

/**
 * Creates a new customer with the provided data.
 */
exports.createCustomer = asyncHandler(async (req, res) => {
  const { email, password, address } = req.body;
  
  // Check if the email already exists
  const existingCustomer = await Customer.findOne({ where: { email } });
  if (existingCustomer) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const sanitizedAddress = address
    ? address.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    : null;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newCustomer = await Customer.create({
    email,
    password: hashedPassword,
    address: sanitizedAddress,
  });

  res.status(201).json(newCustomer);
});

/**
 * Updates an existing customer identified by ID with the provided data.
 */
exports.updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const { email, password, address } = req.body;

  // Check if email exists for another customer
  if (email && email !== customer.email) {
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    customer.email = email;
  }

  if (password) {
    customer.password = await bcrypt.hash(password, 10);
  }

  if (address) {
    customer.address = address.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  await customer.save();
  res.json(customer);
});

/**
 * Deletes a customer identified by its ID.
 */
exports.deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  await customer.destroy();
  res.status(204).send(); // Return 204 No Content
});