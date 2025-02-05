const request = require('supertest');
const app = require('../src/app');

describe('Data Format Validation Tests', () => {
  test('Should reject missing email field', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        password: 'test123'
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(['Customer.email cannot be null']);
  }, 10000); 
});

describe('XSS Protection Tests', () => {
  test('Should escape HTML in address field', async () => {
    const uniqueEmail = `email_${Date.now()}@example.com`;
    const testData = {
      email: uniqueEmail,
      password: 'password123',
      address: '<script>alert("XSS")</script>'
    };

    const response = await request(app)
      .post('/api/customers')
      .send(testData);

    expect(response.status).toBe(201);
    expect(response.body.address).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
  }, 10000); // Timeout à 10 secondes
});