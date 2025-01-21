const sequelize = require('../config/sequelize');
const { DataTypes } = require('sequelize');

// Import and initialize all models
const Category = require('./CategoryModel')(sequelize, DataTypes);
const Coffee = require('./coffeeModel')(sequelize, DataTypes);
const Customer = require('./customerModel')(sequelize, DataTypes);
const Order = require('./orderModel')(sequelize, DataTypes);
const OrderItem = require('./orderItemModel')(sequelize, DataTypes);

// Define associations between models with cascade options
Category.hasMany(Coffee, { 
  foreignKey: 'category_id',
  as: 'coffees',
  onDelete: 'CASCADE'
});

Coffee.belongsTo(Category, { 
  foreignKey: 'category_id',
  as: 'category'
});

Coffee.hasMany(OrderItem, {
  foreignKey: 'coffee_id',
  as: 'orderItems',
  onDelete: 'CASCADE'
});

OrderItem.belongsTo(Coffee, {
  foreignKey: 'coffee_id',
  as: 'coffee'
});

OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order'
});

Customer.hasMany(Order, {
  foreignKey: 'customer_id',
  as: 'orders',
  onDelete: 'CASCADE'
});

Order.belongsTo(Customer, {
  foreignKey: 'customer_id',
  as: 'customer'
});

// Export all models for use in controllers and other parts of the application
module.exports = {
  Category,
  Coffee,
  Customer,
  Order,
  OrderItem,
  sequelize,
};