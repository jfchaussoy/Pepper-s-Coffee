// js/home.js

/**
 * Fetches the latest coffees and displays them in the New Arrivals section.
 */
document.addEventListener("DOMContentLoaded", () => {
    fetchNewArrivals();
  });
  
  /**
   * Fetches new arrival coffees from the API.
   * You can define what qualifies as a new arrival on the backend.
   */
  async function fetchNewArrivals() {
    try {
      // Use the absolute URL to your backend API
      const response = await fetch('http://localhost:3000/api/coffees');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const coffees = await response.json();
  
      // For demonstration, let's assume the first 3 are new arrivals
      const newArrivals = coffees.slice(0, 3);
  
      renderNewArrivals(newArrivals);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      const newArrivalsList = document.getElementById('new-arrivals-list');
      newArrivalsList.innerHTML = '<li>Erreur lors du chargement des nouveautés.</li>';
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
          <img src="../images/coffees/${coffee.reference}.webp" alt="${coffee.name}" class="product-image">
          <div class="product-info">
            <h3 class="product-title">${coffee.name}</h3>
            <a class="btn-outline" href="./article-detail.html?id=${coffee.id}">Voir le détail</a>
          </div>
        </article>
      `;
      newArrivalsList.appendChild(listItem);
    });
  }
  