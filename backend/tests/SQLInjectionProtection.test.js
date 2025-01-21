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
  }, 10000);
});
