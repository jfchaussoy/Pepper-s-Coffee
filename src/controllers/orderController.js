const { Order, OrderItem, Coffee, Customer } = require('../models/indexModels');

/**
 * Retrieves all orders, including related order items and coffee information.
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: Coffee,
          as: 'coffee'
        }]
      },
      {
        model: Customer,
        as: 'customer'
      }]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves a specific order by its ID, including related order items and coffee information.
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Coffee,
              as: 'coffee'
            }
          ]
        },
        {
          model: Customer,
          as: 'customer'
        }
      ],
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new order with the provided data.
 */
exports.createOrder = async (req, res) => {
  try {
    const { customer_id, items } = req.body;
    // Calculate total amount based on items
    let totalAmount = 0;
    for (const item of items) {
      const coffee = await Coffee.findByPk(item.coffee_id);
      if (!coffee) {
        return res.status(400).json({ error: `Coffee with ID ${item.coffee_id} not found` });
      }
      totalAmount += parseFloat(coffee.price_per_kg) * item.quantity;
    }
    const newOrder = await Order.create({
      customer_id,
      total_amount: totalAmount,
    });
    // Create order items
    for (const item of items) {
      await OrderItem.create({
        order_id: newOrder.id,
        coffee_id: item.coffee_id,
        quantity: item.quantity,
      });
    }
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing order identified by its ID with the provided data.
 */
exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes an order identified by its ID.
 */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};