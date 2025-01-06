const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Coffee = sequelize.define('Coffee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reference: {
    type: DataTypes.CHAR(9),
    unique: true,
    allowNull: false,
  },
  origin_country: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price_per_kg: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'coffee',
  timestamps: false
});

module.exports = Coffee;