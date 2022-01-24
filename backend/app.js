const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// error middleware
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// routes
const user = require('./routes/userRoutes');
const cloth = require('./routes/clothRoutes');

app.use('/api/v1/user', user);
app.use('/api/v1/outfit', cloth);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the store!!'
    });
});

app.use(errorMiddleware);

module.exports = app;