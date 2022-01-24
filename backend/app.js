const express = require('express');

const app = express();

app.use(express.json());

// routes
const user = require('./routes/userRoutes');

app.use('/api/v1/user', user);

module.exports = app;