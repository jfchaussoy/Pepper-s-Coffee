/**
 * Directory: frontend/src/services
 * File: api.js
 * Description (Description):
 * Provides functions to fetch coffee data from the server. (Fournit des fonctions pour récupérer les données café depuis le serveur)
 */

const API_URL = '/api';

/**
 * (EN) Fetch the list of coffees. (FR) Récupérer la liste de cafés.
 */
export const fetchCoffees = async () => {
  try {
    const response = await fetch(`${API_URL}/coffees`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coffees:', error);
    throw error;
  }
};

/**
 * (EN) Fetch details of a specific coffee by ID. (FR) Récupérer le détail d'un café spécifique via son ID.
 * @param {string} id 
 */
export const fetchCoffeeById = async (id) => {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid coffee ID');
  }
  
  try {
    const response = await fetch(`${API_URL}/coffees/${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching coffee with ID ${id}:`, error);
    throw error;
  }
};
