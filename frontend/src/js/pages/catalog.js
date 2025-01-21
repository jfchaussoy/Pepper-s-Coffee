/**
 * Directory: frontend/src/js/pages
 * File: catalog.js
 * Description (Description):
 * Handles the initialization of the Catalog page. (Gère l'initialisation de la page catalogue)
 */

import { fetchCoffees } from '../../services/api.js';

export default function initCatalog() {
  fetchCoffees()
    .then(coffees => {
      renderCoffees(coffees);
      setupViewAllButton();
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('product-list').innerHTML = '<p>Erreur lors du chargement des produits.</p>';
    });
}

/**
 * (EN) Render the list of coffees (FR) Affiche la liste de cafés
 * @param {Array} coffees 
 */
function renderCoffees(coffees) {
  const container = document.getElementById('product-list');
  const html = coffees.map(coffee => {
    const article = document.createElement('article');
    article.className = 'product-item';
    // (EN) Inline HTML for product structure (FR) HTML en ligne pour la structure du produit
    article.innerHTML = `
      <img 
        src="${encodeURI(coffee.imageUrl)}" 
        alt="${escapeHTML(coffee.name)}" 
        class="product-image"
        width="300" height="200"
        loading="lazy"
      >
      <div class="product-details">
        <h3 class="product-name">${escapeHTML(coffee.name)}</h3>
        <p class="product-origin">Origine: ${escapeHTML(coffee.origin_country)}</p>
        <p class="product-price">Prix: €${parseFloat(coffee.price_per_kg).toFixed(2)}/kg</p>
      </div>
    `;
    const link = document.createElement('a');
    link.className = 'btn-outline';
    link.href = `/article-detail?id=${encodeURIComponent(coffee.id)}`;
    link.textContent = 'Voir Détails';
    article.querySelector('.product-details').appendChild(link);
    return article.outerHTML;
  }).join('');
  container.innerHTML = html;
}

/**
 * (EN) Escape HTML utility (FR) Fonction utilitaire pour échapper HTML
 */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

/**
 * (EN) Toggle between showing all products or only three (FR) Bascule entre affichage de tous les produits ou seulement trois
 */
function setupViewAllButton() {
  const button = document.getElementById('view-all-products-button');
  const productList = document.getElementById('product-list');

  if (button && productList) {
    button.addEventListener('click', () => {
      productList.classList.toggle('only-show-three');
      button.textContent = productList.classList.contains('only-show-three')
        ? 'Voir tous les produits'
        : 'Voir moins';
    });
    productList.classList.add('only-show-three');
  }
}
