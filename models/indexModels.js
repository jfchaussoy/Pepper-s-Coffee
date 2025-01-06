const Coffee = require('./coffeeModel');
const Category = require('./categoryModel');

// Redéfinir les associations uniquement une fois
Coffee.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

Category.hasMany(Coffee, {
  foreignKey: 'category_id',
  as: 'coffees'
});

module.exports = {
  Coffee,
  Category
};