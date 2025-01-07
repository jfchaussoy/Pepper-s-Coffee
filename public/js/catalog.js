/**
 * Fetches all coffees from the API and displays them in the Catalog section.
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchCoffees();
  setupViewAllButton();
});

/**
 * Fetches all coffee entries from the API.
 */
async function fetchCoffees() {
  try {
    const response = await fetch('/api/coffees');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const coffees = await response.json();

    renderCoffees(coffees);
  } catch (error) {
    console.error('Error fetching coffees:', error);
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<p>Error loading products.</p>';
  }
}

/**
 * Renders the coffee products into the DOM.
 * @param {Array} coffees - Array of coffee objects.
 */
function renderCoffees(coffees) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear existing content

  coffees.forEach(coffee => {
    const productItem = document.createElement('article');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${coffee.imageUrl}" alt="${coffee.name}" class="product-image">
      <div class="product-details">
        <h2 class="product-name">${coffee.name}</h2>
        <p class="product-origin">Origin: ${coffee.origin_country}</p>
        <p class="product-price">Price: €${parseFloat(coffee.price_per_kg).toFixed(2)}/kg</p>
        <a class="btn-outline" href="/article-detail?id=${coffee.id}">View Details</a>
      </div>
    `;
    productList.appendChild(productItem);
  });
}

/**
 * Sets up the "View All Products" button functionality.
 */
function setupViewAllButton() {
  const viewAllButton = document.getElementById('view-all-products-button');
  viewAllButton.addEventListener('click', () => {
    window.location.href = '/catalog';
  });
}



