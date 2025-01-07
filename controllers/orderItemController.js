const OrderItem = require('../models/orderItemModel');
const Coffee = require('../models/coffeeModel');

/**
 * Retrieves all order items.
 */
exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [Coffee],
    });
    res.json(orderItems);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves an order item by ID.
 */
exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id, {
      include: [Coffee],
    });
    if (!orderItem) {
      return res.status(404).json({ error: 'Order Item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    console.error('Error fetching order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new order item.
 */
exports.createOrderItem = async (req, res) => {
  try {
    const { order_id, coffee_id, quantity } = req.body;
    const newOrderItem = await OrderItem.create({ order_id, coffee_id, quantity });
    res.status(201).json(newOrderItem);
  } catch (error) {
    console.error('Error creating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing order item by ID.
 */
exports.updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order Item not found' });
    }
    const { order_id, coffee_id, quantity } = req.body;
    await orderItem.update({ order_id, coffee_id, quantity });
    res.json(orderItem);
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes an order item by ID.
 */
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order Item not found' });
    }
    await orderItem.destroy();
    res.status(200).json({ message: 'Order Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
