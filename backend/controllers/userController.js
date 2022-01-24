const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const AsyncErrorHandler = require('../middleware/catchAsyncError');
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

// login user
exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter username and password both', 401));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
})

// logout user
exports.logoutUser = AsyncErrorHandler(async (req, res, next) => {
    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
})