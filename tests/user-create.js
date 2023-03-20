const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('User controller', () => {
  beforeEach(async () => {
    // Truncate the Users table before each test to ensure a clean slate
    await db.query('TRUNCATE TABLE Users');
  });

describe('POST /users', () => {
  it('should create a new user', async () => {
    const user = {
      username: 'John Smith',
      };

    const response = await request(app).post('/users').send(user);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.username).to.equal(user.username);
    expect(response.body.email).to.equal(user.email);

    it('should return an error if the request body is missing required fields', async () => {
      const response = await request(app).post('/users').send({});

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('null value');
    });
  });
});
});