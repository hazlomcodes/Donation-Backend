// src/controllers/Donation.js
const db = require('../db/index');

exports.createDonation = async (req, res) => {
  const { name, quantity, expiration } = req.body;

  try {
    const { rows: [donation] } = await db.query('INSERT INTO Donations (name, quantity, expiration) VALUES ($1, $2, $3) RETURNING *', [name, quantity, expiration]);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// src/controllers/Donation.js
exports.searchDonations = async (req, res) => {
  const { name } = req.query;

  try {
    const { rows } = await db.query('SELECT * FROM Donations WHERE name ILIKE $1', [`%${name}%`]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'No donations found' });
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.deleteDonation = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await db.query('DELETE FROM Donations WHERE id = $1', [id]);

    if (rowCount === 0) {
      res.status(404).json({ error: 'Donation not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};


