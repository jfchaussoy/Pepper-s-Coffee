// Import necessary models from the models directory
const { Order, OrderItem, Customer, Coffee } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Retrieves all orders, including order items and coffee information.
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

// Note: There's a duplicate function here. This one should be removed or renamed if intended to be different.
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
 * Retrieves a specific order by ID, including order items and coffee information.
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
 * Creates a new order with the provided data.
 */
exports.createOrder = asyncHandler(async (req, res) => {
  const { customer_id, order_items } = req.body;

  // Check if the customer exists
  const customer = await Customer.findByPk(customer_id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  // Create the order
  const order = await Order.create({
    customer_id,
    status: 'pending',
    total_amount: 0
  });

  // Create the order items
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
    // Update the total amount of the order
    order.total_amount = totalAmount;
    await order.save();
  }

  res.status(201).json(order);
});

/**
 * Updates an existing order identified by its ID with the provided data.
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
 * Deletes an order identified by its ID.
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