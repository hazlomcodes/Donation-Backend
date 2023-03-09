const express = require('express');
const cors = require('cors');
const donationRouter = require('./routes/donation');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/donations', donationRouter);

module.exports = app;

