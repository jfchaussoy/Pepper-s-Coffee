const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const Coffee = require('../models/coffeeModel');

/**
 * Retrieves all orders, including items for each order.
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Coffee],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves an order by ID, including its items.
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [Coffee],
        },
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
 * Creates a new order.
 */
exports.createOrder = async (req, res) => {
  try {
    const { customer_id, items } = req.body; // items: [{ coffee_id, quantity }, ...]

    // Create the order
    const newOrder = await Order.create({ customer_id, status: 'pending' });

    // Create order items
    for (const item of items) {
      await OrderItem.create({
        order_id: newOrder.id,
        coffee_id: item.coffee_id,
        quantity: item.quantity,
      });
    }

    // Calculate total_amount
    const totalAmount = await OrderItem.sum('quantity', {
      where: { order_id: newOrder.id },
      include: [
        {
          model: Coffee,
          attributes: ['price_per_kg'],
        },
      ],
      raw: true,
      nest: true,
    });

    // Update total_amount
    await newOrder.update({ total_amount: totalAmount });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing order by ID.
 */
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const { status, total_amount } = req.body;
    await order.update({ status, total_amount });
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes an order by ID.
 */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
