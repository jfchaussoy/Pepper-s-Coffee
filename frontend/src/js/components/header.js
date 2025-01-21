/**
 * Directory: frontend/src/js/components
 * File: header.js
 * Description (Description):
 * Dynamically renders the site's header. (Génère dynamiquement l'en-tête du site)
 */

import initNavigationMenu from './navigation-menu.js';

export default function renderHeader() {
  const header = document.createElement('header');

  // (EN) Create navigation element (FR) Créer l'élément de navigation
  const nav = document.createElement('nav');
  nav.id = 'navigation-menu';

  // (EN) Create logo link (FR) Créer le lien du logo
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'logo-link';

  const logoImg = document.createElement('img');
  logoImg.src = '/images/logo.svg';
  logoImg.alt = "Logo Pepper's Coffee";
  logoImg.className = 'logo';
  // (EN) Add explicit dimension to reduce CLS (FR) Ajout dimension explicite pour réduire CLS
  logoImg.width = 100;
  logoImg.height = 50;

  const brandName = document.createElement('span');
  brandName.className = 'brand-name';
  brandName.textContent = "Pepper's Coffee";

  logoLink.appendChild(logoImg);
  logoLink.appendChild(brandName);

  // (EN) Create toggle button (FR) Bouton toggle
  const toggleButton = document.createElement('button');
  toggleButton.id = 'nav-toggle-button';
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-label', 'Afficher les liens de navigation');

  // (EN) Icon open (FR) Icône open
  const iconOpen = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconOpen.setAttribute('class', 'icon-open');
  iconOpen.setAttribute('width', '24');
  iconOpen.setAttribute('height', '24');
  iconOpen.setAttribute('viewBox', '0 0 24 24');
  iconOpen.setAttribute('fill', 'none');
  iconOpen.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M3 12H21');
  path1.setAttribute('stroke', 'currentColor');
  path1.setAttribute('stroke-width', '1.5');
  path1.setAttribute('stroke-linecap', 'round');
  path1.setAttribute('stroke-linejoin', 'round');
  iconOpen.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M3 6H21');
  path2.setAttribute('stroke', 'currentColor');
  path2.setAttribute('stroke-width', '1.5');
  path2.setAttribute('stroke-linecap', 'round');
  path2.setAttribute('stroke-linejoin', 'round');
  iconOpen.appendChild(path2);

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M3 18H21');
  path3.setAttribute('stroke', 'currentColor');
  path3.setAttribute('stroke-width', '1.5');
  path3.setAttribute('stroke-linecap', 'round');
  path3.setAttribute('stroke-linejoin', 'round');
  iconOpen.appendChild(path3);

  // (EN) Icon close (FR) Icône close
  const iconClose = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconClose.setAttribute('class', 'icon-close');
  iconClose.setAttribute('width', '24');
  iconClose.setAttribute('height', '24');
  iconClose.setAttribute('viewBox', '0 0 24 24');
  iconClose.setAttribute('fill', 'none');
  iconClose.setAttribute('aria-hidden', 'true');

  const closePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  closePath1.setAttribute('d', 'M6 6L18 18');
  closePath1.setAttribute('stroke', 'currentColor');
  closePath1.setAttribute('stroke-width', '1.5');
  closePath1.setAttribute('stroke-linecap', 'round');
  closePath1.setAttribute('stroke-linejoin', 'round');
  iconClose.appendChild(closePath1);

  const closePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  closePath2.setAttribute('d', 'M6 18L18 6');
  closePath2.setAttribute('stroke', 'currentColor');
  closePath2.setAttribute('stroke-width', '1.5');
  closePath2.setAttribute('stroke-linecap', 'round');
  closePath2.setAttribute('stroke-linejoin', 'round');
  iconClose.appendChild(closePath2);

  // (EN) Navigation links (FR) Liens de navigation
  const ul = document.createElement('ul');
  ul.className = 'navigation-links';

  const links = [
    { href: '/', text: 'Accueil' },
    { href: '/catalog', text: 'Catalogue' }
  ];

  links.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  toggleButton.appendChild(iconOpen);
  toggleButton.appendChild(iconClose); // Append the close icon
  nav.appendChild(logoLink);
  nav.appendChild(toggleButton);
  nav.appendChild(ul);

  header.appendChild(nav);
  document.body.prepend(header);

  // (EN) Initialize the menu toggle after insertion (FR) Initialiser le toggle
  initNavigationMenu();
}