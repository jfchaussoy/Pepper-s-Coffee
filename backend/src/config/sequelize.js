// Import Sequelize ORM
const { Sequelize } = require('sequelize');

// Load environment variables from a .env file
require('dotenv').config();

// Initialize Sequelize with database configuration
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',  // Specify the database dialect
  logging: false,       // Disable logging of SQL queries
  pool: {
    max: 5,             // Maximum number of connection in pool
    min: 0,             // Minimum number of connection in pool
    acquire: 30000,     // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000         // Maximum time, in milliseconds, that a connection can be idle before being released
  }
});

// Test the database connection only if the environment is not 'test'
if (process.env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => {
      console.log('✅ Connection to the database established successfully.');
    })
    .catch(err => {
      console.error('❌ Unable to connect to the database:', err);
    });
}

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;