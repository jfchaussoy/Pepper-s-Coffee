const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/config/sequelize');
const { Coffee, Category } = require('../../src/models/indexModels');

describe('Coffee Controller Tests', () => {
  let testCategory;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Coffee.destroy({ where: {} });
    await Category.destroy({ where: {} });
    testCategory = await Category.create({ name: 'Test Category' });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // Test de création
  test('POST /api/coffees should create new coffee', async () => {
    const response = await request(app)
      .post('/api/coffees')
      .send({
        name: 'Test Coffee',
        description: 'Test Description',
        reference: 'TEST123',
        origin_country: 'Test Country',
        price_per_kg: 10.99,
        available: true,
        category_id: testCategory.id
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Coffee');
  }, 10000); // Timeout à 10 secondes

  // Test de lecture
  test('GET /api/coffees should return all coffees', async () => {
    await Coffee.create({
      name: 'Test Coffee',
      description: 'Test Description',
      reference: 'TEST123',
      origin_country: 'Test Country',
      price_per_kg: 10.99,
      available: true,
      category_id: testCategory.id
    });

    const response = await request(app).get('/api/coffees');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  }, 10000); // Timeout à 10 secondes

  // Test de lecture par ID
  test('GET /api/coffees/:id should return specific coffee', async () => {
    const coffee = await Coffee.create({
      name: 'Test Coffee',
      description: 'Test Description',
      reference: 'TEST123',
      origin_country: 'Test Country',
      price_per_kg: 10.99,
      available: true,
      category_id: testCategory.id
    });

    const response = await request(app).get(`/api/coffees/${coffee.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Test Coffee');
  }, 10000); // Timeout à 10 secondes

  // Test de mise à jour
  test('PUT /api/coffees/:id should update coffee', async () => {
    const coffee = await Coffee.create({
      name: 'Test Coffee',
      description: 'Test Description',
      reference: 'TEST123',
      origin_country: 'Test Country',
      price_per_kg: 10.99,
      available: true,
      category_id: testCategory.id
    });

    const response = await request(app)
      .put(`/api/coffees/${coffee.id}`)
      .send({
        name: 'Updated Coffee',
        price_per_kg: 15.99
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Coffee');
  }, 10000); // Timeout à 10 secondes

  // Test de suppression
  test('DELETE /api/coffees/:id should delete coffee', async () => {
    const coffee = await Coffee.create({
      name: 'Test Coffee',
      description: 'Test Description',
      reference: 'TEST123',
      origin_country: 'Test Country',
      price_per_kg: 10.99,
      available: true,
      category_id: testCategory.id
    });

    const deleteResponse = await request(app).delete(`/api/coffees/${coffee.id}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/api/coffees/${coffee.id}`);
    expect(getResponse.status).toBe(404);
  }, 10000); // Timeout à 10 secondes
});