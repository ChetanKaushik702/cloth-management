const app = require('./app');
const connectDB = require('./config/database');
const cloudinary = require('cloudinary');

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception...');
    process.exit(1);
})

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({path: 'backend/config/config.env'});
}

// connect to database
connectDB();

// cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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