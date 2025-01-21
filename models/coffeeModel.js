const { DataTypes } = require('sequelize');

// Define the Coffee model with its attributes and configurations
module.exports = (sequelize) => {
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
      references: {
        model: 'category',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'coffee',
    timestamps: false,
  });

  return Coffee;
};