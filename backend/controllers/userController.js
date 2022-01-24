const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const AsyncErrorHandler = require('../utils/errorHandler');
const ErrorHandler = require('../utils/errorHandler');

// register a user
exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return next(new ErrorHandler('Please enter all user details', 400));
    }

    const user = await User.create({name, email, password, role});

    sendToken(user, 201, res);
});

