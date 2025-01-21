const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/config/sequelize');
const { Order, Customer, Coffee, Category } = require('../../src/models/indexModels');

describe('Order Controller Tests', () => {
  let testCustomerId;
  let testCoffeeId;
  let testCategoryId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Créer catégorie
    const category = await Category.create({
      name: 'Test Category'
    });
    testCategoryId = category.id;

    // Créer client
    const customer = await Customer.create({
      email: 'test@example.com',
      password: 'password123',
      address: '123 Test St'
    });
    testCustomerId = customer.id;

    // Créer café
    const coffee = await Coffee.create({
      name: 'Test Coffee',
      reference: 'TEST12345',
      origin_country: 'Test Country',
      price_per_kg: 10.99,
      available: true,
      category_id: testCategoryId,
      description: 'Test Description'
    });
    testCoffeeId = coffee.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /api/orders should create new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        customer_id: testCustomerId,
        order_items: [{
          coffee_id: testCoffeeId,
          quantity: 2
        }]
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customer_id).toBe(testCustomerId);
  });

  test('GET /api/orders should return all orders', async () => {
    // Créer d'abord une commande test
    await Order.create({
      customer_id: testCustomerId,
      total_amount: 0,
      status: 'pending'
    });

    const response = await request(app).get('/api/orders');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 10000); // Timeout à 10 secondes

  test('GET /api/orders/:id should return specific order', async () => {
    const order = await Order.create({
      customer_id: testCustomerId,
      total_amount: 0,
      status: 'pending'
    });

    const response = await request(app).get(`/api/orders/${order.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(order.id);
  }, 10000); // Timeout à 10 secondes

  test('PUT /api/orders/:id should update order status', async () => {
    const order = await Order.create({
      customer_id: testCustomerId,
      total_amount: 0,
      status: 'pending'
    });

    const response = await request(app)
      .put(`/api/orders/${order.id}`)
      .send({
        status: 'completed'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('completed');
  });

  test('DELETE /api/orders/:id should delete order', async () => {
    const order = await Order.create({
      customer_id: testCustomerId,
      total_amount: 0,
      status: 'pending'
    });

    const deleteResponse = await request(app).delete(`/api/orders/${order.id}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/api/orders/${order.id}`);
    expect(getResponse.status).toBe(404);
  }, 10000); // Timeout à 10 secondes
});