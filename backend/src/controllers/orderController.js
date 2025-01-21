const { Order, OrderItem, Customer, Coffee } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Récupère toutes les commandes, y compris les éléments de commande et les informations sur le café.
 */
exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Coffee] },
        { model: Customer, as: 'customer' }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: OrderItem, include: [Coffee] },
        { model: Customer, as: 'customer' }
      ]
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/**
 * Récupère une commande spécifique par ID, y compris les éléments de commande et les informations sur le café.
 */
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      { model: OrderItem, include: [Coffee] },
      { model: Customer, as: 'customer' }
    ]
  });

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.status(200).json(order);
});

/**
 * Crée une nouvelle commande avec les données fournies.
 */
exports.createOrder = asyncHandler(async (req, res) => {
  const { customer_id, order_items } = req.body;

  // Vérifier si le client existe
  const customer = await Customer.findByPk(customer_id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  // Créer la commande
  const order = await Order.create({
    customer_id,
    status: 'pending',
    total_amount: 0
  });

  // Créer les éléments de commande
  if (order_items && order_items.length > 0) {
    let totalAmount = 0;
    for (const item of order_items) {
      const coffee = await Coffee.findByPk(item.coffee_id);
      if (!coffee) {
        return res.status(404).json({ error: `Coffee with ID ${item.coffee_id} not found` });
      }
      totalAmount += parseFloat(coffee.price_per_kg) * item.quantity;
      await OrderItem.create({
        order_id: order.id,
        coffee_id: item.coffee_id,
        quantity: item.quantity
      });
    }
    // Mettre à jour le montant total de la commande
    order.total_amount = totalAmount;
    await order.save();
  }

  res.status(201).json(order);
});

/**
 * Met à jour une commande existante identifiée par son ID avec les données fournies.
 */
exports.updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  order.status = status || order.status;
  await order.save();
  res.json(order);
});

/**
 * Supprime une commande identifiée par son ID.
 */
exports.deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});