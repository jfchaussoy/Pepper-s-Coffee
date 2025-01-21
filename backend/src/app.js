const express = require('express');
const cors = require('cors');
const routes = require('./routes/indexRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Development mode
if (process.env.NODE_ENV !== 'production') {
    console.log('Mode développement actif - Redirection vers Vite');
    app.get('/', (req, res) => {
        res.redirect('http://localhost:5100');
    });
} else {
    // Production mode
    const distPath = path.join(__dirname, '../../frontend/dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

// Error handling
app.use(errorHandler);

module.exports = app;