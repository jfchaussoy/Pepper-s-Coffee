export default function initNavigationMenu() {
  console.log('initNavigationMenu is running');
  const navigationMenu = document.querySelector("#navigation-menu");
  console.log('navigationMenu:', navigationMenu);
  const navToggleButton = document.querySelector("#nav-toggle-button");
  console.log('navToggleButton:', navToggleButton);

  if (!navigationMenu || !navToggleButton) {
    console.error("Éléments de navigation non trouvés dans le DOM.");
    return;
  }

  // Existing nav toggle button listener
  navToggleButton.addEventListener("click", () => {
    navigationMenu.classList.toggle("is-expanded");
    const isExpanded = navigationMenu.classList.contains("is-expanded");
    navToggleButton.setAttribute("aria-expanded", String(isExpanded));
  });

  // New listener for the logo
  const logoLink = document.querySelector('.logo-link');
  console.log('logoLink:', logoLink);
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      console.log('Logo clicked');
      e.preventDefault(); // Prevent default navigation behavior if needed
      navigationMenu.classList.toggle("is-expanded");
      const isExpanded = navigationMenu.classList.contains("is-expanded");
      navToggleButton.setAttribute("aria-expanded", String(isExpanded));
    });
  }
}