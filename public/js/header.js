document.addEventListener("DOMContentLoaded", () => {
  initNavigationMenu();
});

/**
 * Initializes the navigation menu toggle functionality.
 */
function initNavigationMenu() {
  const navigationMenu = document.getElementById("navigation-menu");
  const navToggleButton = document.getElementById("nav-toggle-button");
  const navigationLinks = document.querySelector(".navigation-links");
  const iconOpen = document.querySelector(".icon-open");
  const iconClose = document.querySelector(".icon-close");

  if (!navigationMenu || !navToggleButton || !navigationLinks) {
    console.error("Navigation elements not found in the DOM.");
    return;
  }

  navToggleButton.addEventListener("click", () => {
    navigationMenu.classList.toggle("is-expanded");
    
    const isExpanded = navigationMenu.classList.contains("is-expanded");

    navToggleButton.setAttribute("aria-expanded", isExpanded);
    navToggleButton.setAttribute("aria-label",
      isExpanded ? "Hide navigation links" : "Show navigation links"
    );

    // Toggle icons visibility
    iconOpen.style.display = isExpanded ? "none" : "block";
    iconClose.style.display = isExpanded ? "block" : "none";
  });
}
