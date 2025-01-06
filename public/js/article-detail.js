// js/article-detail.js

/**
 * Fetches the coffee details based on the ID from the URL query parameter.
 */
document.addEventListener("DOMContentLoaded", () => {
    const coffeeId = getQueryParam('id');
    if (coffeeId) {
      fetchCoffeeDetails(coffeeId);
    } else {
      displayError('Aucun ID de produit spécifié.');
    }
  });
  
  /**
   * Retrieves a query parameter value from the URL.
   * @param {string} param - The name of the query parameter.
   * @returns {string|null} - The value of the query parameter or null if not found.
   */
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  /**
   * Fetches coffee details from the API using the provided ID.
   * @param {string} id - The ID of the coffee product.
   */
  async function fetchCoffeeDetails(id) {
    try {
      // Use the absolute URL to your backend API
      const response = await fetch(`http://localhost:3000/api/coffees/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Produit non trouvé.');
        } else {
          throw new Error('La réponse réseau n\'était pas correcte.');
        }
      }
      const coffee = await response.json();
  
      renderCoffeeDetails(coffee);
    } catch (error) {
      console.error('Error fetching coffee details:', error);
      displayError(error.message);
    }
  }
  
  /**
   * Renders the coffee details into the DOM.
   * @param {Object} coffee - The coffee object retrieved from the API.
   */
  function renderCoffeeDetails(coffee) {
    document.getElementById('detail-image').src = `../images/coffees/${coffee.reference}.webp`;
    document.getElementById('detail-image').alt = coffee.name;
    document.getElementById('detail-name').textContent = coffee.name;
    document.getElementById('detail-description').textContent = coffee.description;
    document.getElementById('detail-price').innerHTML = `Prix : <strong>€${parseFloat(coffee.price_per_kg).toFixed(2)}</strong>`;
    document.getElementById('detail-origin').textContent = `Origine : ${coffee.origin_country}`;
    document.getElementById('detail-reference').textContent = `Référence : ${coffee.reference}`;
  }
  
  /**
   * Displays an error message in the product detail section.
   * @param {string} message - The error message to display.
   */
  function displayError(message) {
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `<p>${message}</p>`;
  }
  