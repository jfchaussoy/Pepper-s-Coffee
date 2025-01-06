// config/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with database credentials from environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

// Export the sequelize instance
module.exports = sequelize;
