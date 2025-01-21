const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/config/sequelize');
const { Order, Customer, Coffee, Category } = require('../../src/models/indexModels');

describe('OrderItem Controller Tests', () => {
  let testOrderId;
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

    // Créer commande
    const order = await Order.create({
      customer_id: customer.id,
      total_amount: 0,
      status: 'pending'
    });
    testOrderId = order.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /api/order-items should create new order item', async () => {
    const response = await request(app)
      .post('/api/order-items')
      .send({
        order_id: testOrderId,
        coffee_id: testCoffeeId,
        quantity: 2
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  }, 10000); // Timeout à 10 secondes
});