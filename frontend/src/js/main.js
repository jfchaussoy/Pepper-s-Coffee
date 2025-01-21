/* Directory: frontend/src/js
   File: main.js */
   import initNavigationMenu from './components/navigation-menu.js';
   import renderHeader from './components/header.js';
   import renderFooter from './components/footer.js';
   import router from './router.js';
   
   // Initialize common components, navigation, and router when DOM is ready.
   document.addEventListener('DOMContentLoaded', function() {
     initNavigationMenu();
     renderHeader();
     renderFooter();
     router.init();
   });