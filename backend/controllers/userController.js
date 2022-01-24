const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// register a user
exports.registerUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({name, email, password, role});

    sendToken(user, 201, res);
}