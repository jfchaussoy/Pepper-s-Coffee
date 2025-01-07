/**
 * Error handling middleware.
 * Logs the error and sends a 500 response.
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  if (res && typeof res.status === 'function') {
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: err.message 
    });
  }
  next(err);
}

module.exports = errorHandler;
