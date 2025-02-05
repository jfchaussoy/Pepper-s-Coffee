/**
 * Error handling middleware.
 * Logs the error and sends a 500 response.
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map(e => e.message)
    });
  }

  // Handle foreign key constraint errors
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Invalid Reference',
      message: 'Referenced resource does not exist'
    });
  }

  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
  next(err);
}

module.exports = errorHandler;