const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require('./config/sequelize');
const coffeeRoutes = require('./routes/coffeeRoute');
const categoryRoutes = require('./routes/categoryRoute');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour les pages HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

app.get('/catalog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'catalog.html'));
});

app.get('/article-detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'article-detail.html'));
});

// Routes API
app.use('/api/coffees', coffeeRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Connexion à la base de données & démarrage du serveur
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
  });