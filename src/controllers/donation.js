// src/controllers/Donation.js
const createDonation = async (req, res) => {
  const { name, quantity, expiration } = req.body;

  try {
    const { rows: [ donation ] } = await db.query('INSERT INTO Donations (name, quantity, expiration) VALUES ($1, $2, $3) RETURNING *', [name, quantity, expiration]);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createDonation };
