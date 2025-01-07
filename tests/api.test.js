const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/sequelize');
const { Coffee, Category } = require('../src/models/indexModels');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');

beforeAll(async () => {
  // Synchronize the database and add test data
  await sequelize.sync({ force: true });

  const category = await Category.create({ name: 'Espresso' });
  await Coffee.create({
    name: 'Test Coffee',
    description: 'A delicious test coffee',
    reference: 'TEST123',
    origin_country: 'Testland',
    price_per_kg: 25,
    available: true,
    category_id: category.id,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/coffees', () => {
  it('should respond with status 200 and return a list of coffees in JSON format', async () => {
    const response = await request(app).get('/api/coffees');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name', 'Test Coffee');
  });
});
