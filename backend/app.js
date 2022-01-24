const express = require('express');
const cookieParser = require('cookie-parser');

// error middleware
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes
const user = require('./routes/userRoutes');
const cloth = require('./routes/clothRoutes');

app.use('/api/v1/user', user);
app.use('/api/v1/outfit', cloth);

app.use(errorMiddleware);

module.exports = app;