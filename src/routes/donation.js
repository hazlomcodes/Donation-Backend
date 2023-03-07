// src/routes/Donation.js
const express = require('express');
const { createDonation } = require('../controllers/donations');

const router = express.Router();

router.post('/donations', createDonation);

module.exports = router;
