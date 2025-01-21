/**
 * Directory: frontend/src/js
 * File: router.js
 * Description (Description):
 * Manages client-side routes. (Gère les routes côté client)
 */

const router = {
  // (EN) Define routes with associated template and script. (FR) Définir les routes avec leur template et script.
  routes: {
    '/': {
      template: '/public/html/home.html',
      script: '/src/js/pages/home.js'
    },
    '/catalog': {
      template: '/public/html/catalog.html',
      script: '/src/js/pages/catalog.js'
    },
    '/article-detail': {
      template: '/public/html/article-detail.html',
      script: '/src/js/pages/article-detail.js'
    },
    '/404': {
      template: '/public/html/404.html',
      script: null
    },
    '/403': {
      template: '/public/html/403.html',
      script: null
    }
  },

  /**
   * (EN) Initialize the router (FR) Initialiser le router
   */
  init() {
    // (EN) Handle clicks on internal links (FR) Gère les clics sur les liens internes
    document.querySelectorAll('.navigation-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        window.history.pushState({}, '', url);
        this.handleRoute(url);
      });
    });

    // (EN) Handle back/forward navigation (FR) Gère navigation arrière/avant
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    // (EN) Handle initial page load (FR) Gestion du chargement initial
    this.handleRoute(window.location.pathname);
  },

  /**
   * (EN) Load the corresponding template and script for a given route (FR) Charger le template et le script pour la route donnée
   */
  async handleRoute(url) {
    const route = this.routes[url] || this.routes['/404'];
    try {
      const response = await fetch(route.template);
      if (!response.ok) {
        throw new Error(`Impossible de charger le template: ${route.template}`);
      }
      const html = await response.text();
      document.getElementById('app').innerHTML = html;

      // (EN) Dynamically import the script for the route (FR) Import dynamique du script
      if (route.script) {
        const pageModule = await import(/* @vite-ignore */ route.script);
        if (typeof pageModule.default === 'function') {
          pageModule.default();
        }
      }
    } catch (error) {
      console.error(`Erreur lors du chargement de la route ${url}:`, error);
      // (EN) Fallback to 404 template (FR) Repli sur le template 404
      const fallbackResponse = await fetch(this.routes['/404'].template);
      const fallbackHtml = await fallbackResponse.text();
      document.getElementById('app').innerHTML = fallbackHtml;
    }
  },

  someProtectedFunction() {
    const hasAccess = false; // Logique pour vérifier l'accès
    if (!hasAccess) {
      this.handleRoute('/403');
    }
  }
};

export default router;