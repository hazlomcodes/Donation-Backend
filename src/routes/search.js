// Import necessary packages and models
const express = require('express');
const { Op } = require('sequelize');
const { Donation } = require('./models');

// Create a new router instance
const router = express.Router();

// Define a search/filter route
router.get('/donations', async (req, res) => {
  // Get the search query from the request
  const { query } = req.query;

  try {
    // Search for donations where the name contains the search query
    const donations = await Donation.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    // Send the search results back to the client
    res.status(200).json({ donations });
  } catch (err) {
    // Handle any errors that occur during the search
    console.error(err);
    res.status(500).json({ message: 'An error occurred while searching for donations.' });
  }
});

module.exports = router;
