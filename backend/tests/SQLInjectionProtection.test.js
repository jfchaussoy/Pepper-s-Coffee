const request = require('supertest');
const app = require('../src/app');

describe('SQL Injection Protection Tests', () => {
  test('Should reject inputs with excessive length for email', async () => {
    const longEmail = `test@${'a'.repeat(250)}.com`;
    const response = await request(app)
      .post('/api/customers')
      .send({
        email: longEmail,
        password: 'test123'
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Validation len on email failed');
  }, 10000); // Augmentation du timeout à 10 secondes
});

// filepath: /c:/Users/docje/OneDrive/Documents/Code/Pepper's Coffee/Pepper-s-Coffee/backend/tests/OversizedInputValidation.test.js
const requestOversized = require('supertest');
const appOversized = require('../src/app');

describe('Oversized Input Tests', () => {
  test('Should reject inputs with excessive length for email', async () => {
    // Créer un email valide mais trop long (> 255 caractères)
    const longEmail = 'test@' + 'a'.repeat(251) + '.com';
    
    const response = await requestOversized(appOversized)
      .post('/api/customers')
      .send({
        email: longEmail,
        password: 'ValidPassword123',
        address: '123 Test St'
      });

    expect(response.status).toBe(400);
    // Vérifier le message d'erreur exact retourné par Sequelize
    expect(response.body.errors).toContain('Validation len on email failed');
  }, 10000); // Augmentation du timeout à 10 secondes
});