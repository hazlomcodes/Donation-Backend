// src/routes/Donation.js
const express = require('express');
const donationController = require('../controllers/donation');

const donationRouter = express.Router();

donationRouter.get('/', donationController.searchDonations);
donationRouter.post('/', donationController.createDonation);
donationRouter.delete('/:id', donationController.deleteDonation);

module.exports = donationRouter;
