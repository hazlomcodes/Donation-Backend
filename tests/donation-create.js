const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('create donation', () => {
  describe('/donations', () => {
    describe('POST', () => {
      it('creates a new donation in the database', async () => {
        const res = await request(app).post('/donations').send({
          name: 'Tomato',
          quantity: '1',
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});