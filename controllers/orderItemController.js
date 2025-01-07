const { OrderItem, Coffee } = require('../models/indexModels');

/**
 * Retrieves all order items, including related coffee information.
 */
exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [{ 
        model: Coffee,
        as: 'coffee'  
      }]
    });
    res.json(orderItems);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves a specific order item by its ID, including related coffee information.
 */
exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id, {
      include: [{ 
        model: Coffee,
        as: 'coffee'
      }]
    });
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    console.error('Error fetching order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new order item with the provided data.
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
 * Updates an existing order item identified by its ID with the provided data.
 */
exports.updateOrderItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    orderItem.quantity = quantity;
    await orderItem.save();
    res.json(orderItem);
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes an order item identified by its ID.
 */
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    await orderItem.destroy();
    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};