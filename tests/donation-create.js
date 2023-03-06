const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db')
const app = require('../src/app');

describe('create donation', () => {
  describe('/donations', () => {
    describe('POST', () => {
      it('creates a new donation in the database', async () => {
        const { status, body} = await request(app).post('/donations').send({
          name: 'Tomato',
          quantity: '1',
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Tomato');
        expect(body.quantity).to.equal('1');

        const {
          rows: [donationData],
        } = await db.query(`SELECT * FROM donations WHERE id = ${body.id}`);
        expect(donationData.name).to.equal('Tomato');
        expect(donationData.quantity).to.equal('1');
        
      
      });
    });
  });
});