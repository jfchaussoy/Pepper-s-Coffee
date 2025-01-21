/**
 * Directory: frontend/src/js/pages
 * File: article-detail.js
 * Description (Description):
 * Handles the initialization of the article detail page. (Gère l'initialisation de la page de détail article)
 */

import { fetchCoffeeById } from '../../services/api.js';

export default function initArticleDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    fetchCoffeeById(id)
      .then(coffee => {
        renderCoffeeDetails(coffee);
      })
      .catch(error => {
        console.error('Error:', error);
        const errorElement = document.getElementById('product-detail');
        errorElement.textContent = 'Erreur lors du chargement du produit.';
      });
  }
}

/**
 * (EN) Render details of a specific coffee (FR) Affiche les détails d'un café spécifique
 * @param {Object} coffee 
 */
function renderCoffeeDetails(coffee) {
  const detailImage = document.getElementById('detail-image');
  detailImage.src = encodeURI(coffee.imageUrl);
  detailImage.alt = escapeHTML(coffee.name);

  document.getElementById('detail-name').textContent = coffee.name;
  document.getElementById('detail-description').textContent = coffee.description;

  const detailPrice = document.getElementById('detail-price');
  detailPrice.textContent = 'Prix : ';
  const strongPrice = document.createElement('strong');
  strongPrice.textContent = `€${parseFloat(coffee.price_per_kg).toFixed(2)}`;
  detailPrice.appendChild(strongPrice);

  document.getElementById('detail-origin').textContent = `Origine : ${escapeHTML(coffee.origin_country)}`;
  document.getElementById('detail-reference').textContent = `Référence : ${escapeHTML(coffee.reference)}`;
}

/**
 * (EN) Safely escape HTML to avoid XSS (FR) Échapper les caractères HTML pour éviter XSS
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
