const request = require('supertest');
const app = require('../src/app');

describe('Oversized Input Tests', () => {
  test('Should reject inputs with excessive length for email', async () => {
    const longEmail = 'test@' + 'a'.repeat(251) + '.com';
    
    const response = await request(app)
      .post('/api/customers')
      .send({
        email: longEmail,
        password: 'ValidPassword123',
        address: '123 Test St'
      });

    expect(response.status).toBe(400);
    // Vérifier le message d'erreur exact retourné par Sequelize
    expect(response.body.errors).toContain('Validation len on email failed');
  }, 10000); // Timeout à 10 secondes
});