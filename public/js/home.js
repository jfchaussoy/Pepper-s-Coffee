/**
 * Fetches the latest coffees and displays them in the New Arrivals section.
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchNewArrivals();
});

/**
 * Fetches new arrival coffees from the API.
 */
async function fetchNewArrivals() {
  try {
    const response = await fetch('/api/coffees');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const coffees = await response.json();

    // For demonstration, assume the first 3 are new arrivals
    const newArrivals = coffees.slice(0, 3);

    renderNewArrivals(newArrivals);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    const newArrivalsList = document.getElementById('new-arrivals-list');
    newArrivalsList.innerHTML = '<li>Error loading new arrivals.</li>';
  }
}

/**
 * Renders the new arrivals coffees into the DOM.
 * @param {Array} coffees - Array of coffee objects.
 */
function renderNewArrivals(coffees) {
  const newArrivalsList = document.getElementById('new-arrivals-list');
  newArrivalsList.innerHTML = ''; // Clear existing content

  coffees.forEach(coffee => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <article class="product-item">
        <img src="${coffee.imageUrl}" alt="${coffee.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${coffee.name}</h3>
          <a class="btn-outline" href="/article-detail?id=${coffee.id}">View Details</a>
        </div>
      </article>
    `;
    newArrivalsList.appendChild(listItem);
  });
}






