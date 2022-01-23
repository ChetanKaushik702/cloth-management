require('dotenv').config({path: 'backend/config/config.env'});
const app = require('./app');
const connectDB = require('./config/database');

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception...');
    process.exit(1);
})

// connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled rejection');

    server.close(() => {
        process.exit(2);
    });
})