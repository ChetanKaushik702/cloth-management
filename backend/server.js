require('dotenv').config({path: 'backend/config/config.env'});
const app = require('./app');
const connectDB = require('./config/database');

// connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});