// src/controllers/Donation.js
const createDonation = async (req, res) => {
    const { name, quantity } = req.body
  
    try {
      const { rows: [ donation ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ('${name}', '${quantity}') RETURNING *`)
      res.status(201).json(donation)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
  
  module.exports = { createDonation }