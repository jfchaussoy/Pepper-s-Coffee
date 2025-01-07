const express = require('express');
const router = express.Router();

// Import individual route modules
const categoryRoutes = require('./categoryRoute'); 
const coffeeRoutes = require('./coffeeRoute');
const customerRoutes = require('./customerRoutes');
const orderRoutes = require('./orderRoutes');
const orderItemRoutes = require('./orderItemRoutes');

// Static page routes
router.get('/', (req, res) => {
  res.sendFile('public/html/home.html', { root: '.' });
});

router.get('/catalog', (req, res) => {
  res.sendFile('public/html/catalog.html', { root: '.' });
});

router.get('/article-detail', (req, res) => {
  res.sendFile('public/html/article-detail.html', { root: '.' });
});

// API routes
router.use('/api/categories', categoryRoutes);
router.use('/api/coffees', coffeeRoutes);
router.use('/api/customers', customerRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/order-items', orderItemRoutes);

module.exports = router;
