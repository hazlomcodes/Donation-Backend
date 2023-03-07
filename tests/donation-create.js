const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Donation controller', () => {
  beforeEach(async () => {
    // Truncate the Donations table before each test to ensure a clean slate
    await db.query('TRUNCATE TABLE Donations');
  });

  describe('POST /donations', () => {
    it('should create a new donation', async () => {
      const donation = {
        name: 'Canned Soup',
        quantity: 10,
        expiration: '2022-04-01'
      };

      const response = await request(app)
        .post('/donations')
        .send(donation);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.equal(donation.name);
      expect(response.body.quantity).to.equal(donation.quantity);
      expect(response.body.expiration).to.equal(donation.expiration);
    });

    it('should return an error if the request body is missing required fields', async () => {
      const response = await request(app)
        .post('/donations')
        .send({});

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('null value');
    });
  });

  describe('DELETE /donations/:id', () => {
    it('should delete an existing donation', async () => {
      // Insert a donation into the database
      const { rows: [donation] } = await db.query('INSERT INTO Donations (name, quantity, expiration) VALUES ($1, $2, $3) RETURNING *', ['Canned Soup', 10, '2022-04-01']);

      const response = await request(app)
        .delete(`/donations/${donation.id}`);

      expect(response.status).to.equal(204);

      // Verify that the donation was deleted from the database
      const { rows } = await db.query('SELECT * FROM Donations WHERE id = $1', [donation.id]);
      expect(rows).to.have.lengthOf(0);
    });

    it('should return an error if the donation does not exist', async () => {
      const response = await request(app)
        .delete('/donations/123');

      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Donation not found');
    });
  });
});
