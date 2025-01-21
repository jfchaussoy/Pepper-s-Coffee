const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/config/sequelize');
const { Customer } = require('../../src/models/indexModels');
const bcrypt = require('bcrypt');

describe('Customer Controller Tests', () => {
  
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Customer.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('GET /api/customers should return all customers', async () => {
    await Customer.create({
      email: 'test@test.com',
      password: await bcrypt.hash('password123', 10),
      address: '123 Test St'
    });

    const response = await request(app).get('/api/customers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].email).toBe('test@test.com');
  }, 10000); // Timeout à 10 secondes

  test('GET /api/customers/:id should return specific customer', async () => {
    const customer = await Customer.create({
      email: 'test@test.com',
      password: await bcrypt.hash('password123', 10),
      address: '123 Test St'
    });

    const response = await request(app).get(`/api/customers/${customer.id}`);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe('test@test.com');
    expect(response.body.address).toBe('123 Test St');
  }, 10000); // Timeout à 10 secondes

  test('PUT /api/customers/:id should update customer', async () => {
    const customer = await Customer.create({
      email: 'test@test.com',
      password: await bcrypt.hash('password123', 10),
      address: '123 Test St'
    });

    const response = await request(app)
      .put(`/api/customers/${customer.id}`)
      .send({
        email: 'updated@test.com',
        address: '&lt;script&gt;alert("XSS")&lt;/script&gt;'
      });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('updated@test.com');
    expect(response.body.address).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
  }, 10000); // Timeout à 10 secondes

  test('POST /api/customers should create new customer', async () => {
    const newCustomer = {
      email: 'new@test.com',
      password: 'password123',
      address: '456 New St'
    };

    const response = await request(app)
      .post('/api/customers')
      .send(newCustomer);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(newCustomer.email);
    expect(response.body.address).toBe(newCustomer.address);
  }, 10000); // Timeout à 10 secondes

  test('POST /api/customers should reject duplicate email', async () => {
    await Customer.create({
      email: 'duplicate@test.com',
      password: await bcrypt.hash('password123', 10),
      address: '123 Test St'
    });
  
    const response = await request(app)
      .post('/api/customers')
      .send({
        email: 'duplicate@test.com',
        password: 'newpassword123',
        address: '456 New St'
      });
  
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already exists'); // Assurez-vous que le message d'erreur correspond
  }, 10000);

  test('PUT /api/customers/:id should reject invalid ID', async () => {
    const response = await request(app)
      .put('/api/customers/999999')
      .send({
        email: 'invalid@test.com'
      });
  
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Customer not found'); // Assurez-vous que le message d'erreur correspond
  }, 10000);

  test('GET /api/customers/:id should return 404 for non-existent customer', async () => {
    const response = await request(app).get('/api/customers/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Customer not found'); // Ajustez selon votre logique de réponse
  }, 10000); // Timeout à 10 secondes

  test('DELETE /api/customers/:id should delete customer', async () => {
    const customer = await Customer.create({
      email: 'delete@test.com',
      password: await bcrypt.hash('password123', 10),
      address: '123 Test St'
    });

    const deleteResponse = await request(app).delete(`/api/customers/${customer.id}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/api/customers/${customer.id}`);
    expect(getResponse.status).toBe(404);
  }, 10000); // Timeout à 10 secondes
});