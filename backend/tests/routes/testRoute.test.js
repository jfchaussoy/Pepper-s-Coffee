const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/config/sequelize');

describe('Test Route', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('GET /api/test should return a success message', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'API is working!' });
  }, 20000); 
});