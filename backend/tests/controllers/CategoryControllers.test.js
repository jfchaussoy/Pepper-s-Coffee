const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/config/sequelize');
const { Category } = require('../../src/models/indexModels'); 

describe('Category Controller Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Category.destroy({ 
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    
    // Créer des données de test
    await Category.create({
      name: 'Test Category'
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('GET /api/categories should return all categories', async () => {
    const response = await request(app).get('/api/categories');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Test Category');
  }, 10000); // Timeout à 10 secondes

  test('POST /api/categories should create a new category', async () => {
    const newCategory = {
      name: 'New Category'
    };
    const response = await request(app)
      .post('/api/categories')
      .send(newCategory);
      
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newCategory.name);
  }, 10000); // Timeout à 10 secondes

  test('PUT /api/categories/:id should update a category', async () => {
    const updateData = {
      name: 'Updated Category'  
    };
    
    const response = await request(app)
      .put('/api/categories/1')
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateData.name);
  }, 10000); // Timeout à 10 secondes

  test('DELETE /api/categories/:id should delete a category', async () => {
    const response = await request(app).delete('/api/categories/1');
    expect(response.status).toBe(204);

    // Vérifier que la catégorie est supprimée
    const getResponse = await request(app).get('/api/categories/1');
    expect(getResponse.status).toBe(404);
  }, 10000); // Timeout à 10 secondes

  test('GET /api/categories/:id should return 404 for non-existent category', async () => {
    const response = await request(app).get('/api/categories/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Category not found'); // Ajustez selon votre logique de réponse
  }, 10000); // Timeout à 10 secondes
});