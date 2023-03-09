// src/routes/Donation.js
const express = require('express');
const donationController = require('../controllers/donation');

const donationRouter = express.Router();

donationRouter.post('/', donationController.createDonation);
donationRouter.get('/', donationController.getAllDonations);
donationRouter.get('/search', donationController.searchDonations); //?name=carrot
donationRouter.patch('/:id', donationController.updateQuantity);
donationRouter.delete('/:id', donationController.deleteDonation);

module.exports = donationRouter;
