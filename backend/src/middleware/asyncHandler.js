/**
 * Middleware to handle asynchronous errors
 * @param {Function} fn - Asynchronous function to wrap
 * @returns {Function} Express Middleware
 */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;