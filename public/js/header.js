// header.js
// Handles the toggle functionality of the navigation menu for accessibility and responsiveness

// Wait for the entire DOM to load before initializing the navigation menu
document.addEventListener("DOMContentLoaded", () => {
  initNavigationMenu();
});

/**
 * Initializes the navigation menu toggle functionality.
 * Sets up event listeners and manages ARIA attributes for accessibility.
 */
function initNavigationMenu() {
  // Get the navigation menu element by its ID
  const navigationMenu = document.getElementById("navigation-menu");
  
  // Get the navigation toggle button by its ID
  const navToggleButton = document.getElementById("nav-toggle-button");
  
  // Select the first element with the class 'navigation-links'
  const navigationLinks = document.querySelector(".navigation-links");

  // Add a click event listener to the navigation toggle button
  navToggleButton.addEventListener("click", () => {
    // Toggle the 'is-expanded' class on the navigation menu
    navigationMenu.classList.toggle("is-expanded");

    // Determine if the navigation menu is currently expanded
    const isExpanded = navigationMenu.classList.contains("is-expanded");
    
    // Update the ARIA attribute to reflect the expanded/collapsed state
    navToggleButton.setAttribute("aria-expanded", isExpanded);
    
    // Update the ARIA label to describe the current action
    navToggleButton.setAttribute("aria-label", 
      isExpanded ? "Hide navigation links" : "Show navigation links"
    );

    // Toggle the display property of the navigation links based on the menu state
    if (isExpanded) {
      // If expanded, display the navigation links as a flex container
      navigationLinks.style.display = "flex";
    } else {
      // If collapsed, hide the navigation links
      navigationLinks.style.display = "none";
    }
  });
}
