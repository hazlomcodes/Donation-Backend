// src/routes/Donation.js
const express = require('express');
const donationController = require('../controllers/donation');

const router = express.Router();

router.post('/', donationController.createDonation);

module.exports = router;