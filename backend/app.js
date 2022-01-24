const express = require('express');

// error middleware
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());

// routes
const user = require('./routes/userRoutes');

app.use('/api/v1/user', user);

app.use(errorMiddleware);

module.exports = app;