// src/routes/Donation.js
const express = require('express');
const { createDonation, deleteDonation } = require('../controllers/donation');

const router = express.Router();

router.post('/donations', createDonation);
router.delete('/:donationsId', deleteDonation);

module.exports = router;
