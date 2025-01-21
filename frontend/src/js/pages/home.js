/**
 * Directory: frontend/src/js/pages
 * File: home.js
 * Description (Description):
 * Handles the initialization of the Home page. (Gère l'initialisation de la page d'accueil)
 */

import { fetchCoffees } from '../../services/api.js';

/**
 * (EN) Initialize the home page (FR) Initialiser la page d'accueil
 */
export default function initHome() {
  fetchCoffees()
    .then(coffees => {
      const newArrivals = coffees.slice(0, 3);
      renderNewArrivals(newArrivals);
    })
    .catch(error => {
      console.error('Error:', error);
      const container = document.getElementById('new-arrivals-list');
      container.textContent = 'Erreur lors du chargement des nouveautés.';
    });
}

/**
 * (EN) Render the new arrivals list (FR) Affiche la liste des nouveautés
 * @param {Array} coffees 
 */
function renderNewArrivals(coffees) {
  const container = document.getElementById('new-arrivals-list');
  container.innerHTML = ''; 

  coffees.forEach(coffee => {
    const li = document.createElement('li');
    const article = document.createElement('article');
    article.className = 'product-item';

    // (EN) Product image (FR) Image du produit
    const img = document.createElement('img');
    img.src = encodeURI(coffee.imageUrl);
    img.alt = escapeHTML(coffee.name);
    img.className = 'product-image';
    // (EN) Add explicit dimension if possible (FR) Ajouter dimensions si possible
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy';

    // (EN) Product details container (FR) Conteneur des détails
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';

    const title = document.createElement('h3');
    title.className = 'product-name';
    title.textContent = coffee.name;

    const origin = document.createElement('p');
    origin.className = 'product-origin';
    origin.textContent = `Origine: ${coffee.origin_country || 'Pays'}`;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = coffee.price_per_kg
      ? `Prix: €${parseFloat(coffee.price_per_kg).toFixed(2)}/kg`
      : 'Prix: €XX.XX/kg';

    const link = document.createElement('a');
    link.className = 'btn-outline';
    link.href = `/article-detail?id=${encodeURIComponent(coffee.id)}`;
    link.textContent = 'Voir Détails';

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(origin);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(link);

    article.appendChild(img);
    article.appendChild(detailsDiv);
    li.appendChild(article);
    container.appendChild(li);
  });
}

/**
 * (EN) Safely escape HTML to avoid XSS (FR) Échapper les caractères HTML pour éviter XSS
 */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\'': '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
