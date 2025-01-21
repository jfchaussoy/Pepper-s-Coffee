// Import necessary models from the models directory
const { OrderItem, Order, Coffee } = require('../models/indexModels');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Retrieves all order items
 */
exports.getAllOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await OrderItem.findAll({
    include: [
      { model: Coffee, as: 'coffee' },
      { model: Order, as: 'order' }
    ]
  });
  res.status(200).json(orderItems);
});

/**
 * Retrieves an order item by ID
 */
exports.getOrderItemById = asyncHandler(async (req, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id, {
    include: [
      { model: Coffee, as: 'coffee' },
      { model: Order, as: 'order' }
    ]
  });
  
  if (!orderItem) {
    return res.status(404).json({ error: 'Order Item not found' });
  }
  
  res.status(200).json(orderItem);
});

/**
 * Creates a new order item
 */
exports.createOrderItem = asyncHandler(async (req, res) => {
  const { order_id, coffee_id, quantity } = req.body;
  
  const [order, coffee] = await Promise.all([
    Order.findByPk(order_id),
    Coffee.findByPk(coffee_id)
  ]);

  if (!order || !coffee) {
    return res.status(404).json({ 
      error: !order ? 'Order not found' : 'Coffee not found' 
    });
  }

  const orderItem = await OrderItem.create({
    order_id,
    coffee_id,
    quantity
  });

  res.status(201).json(orderItem);
});

/**
 * Updates an order item
 */
exports.updateOrderItem = asyncHandler(async (req, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  
  if (!orderItem) {
    return res.status(404).json({ error: 'Order Item not found' });
  }

  await orderItem.update(req.body);
  res.status(200).json(orderItem);
});

/**
 * Deletes an order item
 */
exports.deleteOrderItem = asyncHandler(async (req, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  
  if (!orderItem) {
    return res.status(404).json({ error: 'Order Item not found' });
  }

  await orderItem.destroy();
  res.status(200).json({ message: 'Order Item deleted successfully' });
});