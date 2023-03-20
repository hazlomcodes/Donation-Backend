const express = require('express');
const cors = require('cors');
const donationRouter = require('./routes/donation');
const userRouter = require('./routes/users');
const app = express();
app.use(cors());

app.use(express.json());

app.use('/donations', donationRouter);
app.use('/users', userRouter);

module.exports = app;
