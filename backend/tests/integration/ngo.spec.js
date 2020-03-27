const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('NGO', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should return all NGOs', async () => {
    const response = await request(app)
      .get('/ngos')
      .send();

    expect(response.body).toHaveLength(0);
  });

  it('should be able to create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '0011112222',
        city: 'Rio do Sul',
        uf: 'SC',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to create a new NGO and get it from the list of all NGOs', async () => {
    const data = {
      name: 'APAD',
      email: 'contato@apad.com.br',
      whatsapp: '0011112222',
      city: 'Rio do Sul',
      uf: 'SC',
    };

    await request(app)
      .post('/ngos')
      .send(data);

    const response = await request(app)
      .get('/ngos')
      .send();

    expect(response.body).toHaveLength(1);

    Object.entries(data).forEach(([key, value]) => {
      expect(response.body[0]).toHaveProperty(key);
      expect(response.body[0][key]).toBe(value);
    });
  });
});
