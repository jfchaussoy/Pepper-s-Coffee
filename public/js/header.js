document.addEventListener("DOMContentLoaded", () => {
  initNavigationMenu();
});

function initNavigationMenu() {
  const navigationMenu = document.getElementById("navigation-menu");
  const navToggleButton = document.getElementById("nav-toggle-button");
  const navigationLinks = document.querySelector(".navigation-links");
  const iconOpen = document.querySelector(".icon-open");
  const iconClose = document.querySelector(".icon-close");

  if (!navigationMenu || !navToggleButton || !navigationLinks) {
    console.error("Éléments de navigation introuvables dans le DOM.");
    return;
  }

  navToggleButton.addEventListener("click", () => {
    navigationMenu.classList.toggle("is-expanded");
    
    const isExpanded = navigationMenu.classList.contains("is-expanded");

    navToggleButton.setAttribute("aria-expanded", isExpanded);
    navToggleButton.setAttribute("aria-label",
      isExpanded ? "Cacher les liens de navigation" : "Afficher les liens de navigation"
    );

    // Toggle des icônes
    iconOpen.style.display = isExpanded ? "none" : "block";
    iconClose.style.display = isExpanded ? "block" : "none";
  });
}