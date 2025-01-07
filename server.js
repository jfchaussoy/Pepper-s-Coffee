const app = require('./index');
const { sequelize } = require('./models/indexModels');

const PORT = process.env.PORT || 3000;

/**
 * Starts the server after ensuring database connectivity.
 */
async function startServer() {
  try {
    // Authenticate with the database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Synchronize models with the database
    await sequelize.sync(); // Consider { force: true } only in development
    console.log('✅ Models synchronized');

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1); // Exit the process on error
  }
}

// Start the server if this file is executed directly
if (require.main === module) {
  startServer();
}
