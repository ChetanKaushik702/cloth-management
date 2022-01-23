const mongoose = require('mongoose');

const connectDB = async () => {
    const result = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected to ${result.connection.host}`)
}

module.exports = connectDB;