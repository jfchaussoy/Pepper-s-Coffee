const { Customer } = require('../models/indexModels');
const bcrypt = require('bcrypt');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Récupère tous les clients de la base de données.
 */
exports.getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

/**
 * Récupère un client spécifique par ID.
 */
exports.getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

/**
 * Crée un nouveau client avec les données fournies.
 */
exports.createCustomer = asyncHandler(async (req, res) => {
  const { email, password, address } = req.body;
  
  // Vérifier si l'email existe déjà
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
 * Met à jour un client existant identifié par son ID avec les données fournies.
 */
exports.updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const { email, password, address } = req.body;

  // Vérifier si l'email existe déjà pour un autre client
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
 * Supprime un client identifié par son ID.
 */
exports.deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  await customer.destroy();
  res.status(204).send(); // Renvoie 204 No Content
});