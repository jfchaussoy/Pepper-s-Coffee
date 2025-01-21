require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/sequelize');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT} en mode ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
}

startServer();