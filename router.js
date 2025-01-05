const { Router } = require("express");
const mainController = require("./controllers/main-controller");
const path = require("path"); // Import de path pour utiliser sendFile

const router = Router();

// Définir les routes principales
router.get("/", mainController.renderHomePage);
router.get("/catalog", mainController.renderCatalogPage);
router.get("/article/:id", mainController.renderCoffeeDetailsPage);

// Route pour gérer les pages non trouvées
router.use((req, res) => {
  res.status(404).sendFile(__dirname + "/views/pages/not-found.html");
});

module.exports = router;
