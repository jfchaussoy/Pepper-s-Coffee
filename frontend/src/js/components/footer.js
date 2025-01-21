/* Directory: frontend/src/js/components
   File: footer.js */
// Function to render the footer if it does not already exist in the DOM.
export default function renderFooter() {
    if (!document.querySelector('footer')) {
      const footer = document.createElement('footer');
      const paragraph = document.createElement('p');
      paragraph.textContent = 'Pepper Brothers - Tous droits réservés';
      footer.appendChild(paragraph);
      // Append the footer to the document body.
      document.body.appendChild(footer);
    }
  }
  