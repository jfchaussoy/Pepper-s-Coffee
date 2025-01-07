const sequelize = require('../config/sequelize');
const CoffeeModel = require('./coffeeModel');
const CategoryModel = require('./categoryModel');
const CustomerModel = require('./customerModel');
const OrderModel = require('./orderModel');
const OrderItemModel = require('./orderItemModel');

// Initialize models
const Coffee = CoffeeModel(sequelize);
const Category = CategoryModel(sequelize);
const Customer = CustomerModel(sequelize);
const Order = OrderModel(sequelize);
const OrderItem = OrderItemModel(sequelize);

// Define associations between models
Category.hasMany(Coffee, { foreignKey: 'category_id', as: 'coffees' });
Coffee.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Coffee.hasMany(OrderItem, { foreignKey: 'coffee_id', as: 'orderItems' });
OrderItem.belongsTo(Coffee, { foreignKey: 'coffee_id', as: 'coffee' });

// Export the initialized Sequelize instance and models
module.exports = {
  sequelize,
  Coffee,
  Category,
  Customer,
  Order,
  OrderItem
};
