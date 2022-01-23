const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter your username']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please enter your e-mail']
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        required: [true, 'Please enter your password']
    },
    role: {
        type: String,
        trim: true,
        required: [true, 'Please enter your role']
    },
    joinedOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user', userSchema);