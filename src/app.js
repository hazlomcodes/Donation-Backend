const express = require('express');
const donationRouter = require('./routes/donation');

const app = express();

app.use(express.json());

app.use('/donations', donationRouter);

module.exports = app;

