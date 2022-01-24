const Outfit = require('../models/clothModel');
const AsyncErrorHandler = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// add a cloth to store ADMIN Route
exports.addOutfit = AsyncErrorHandler(async (req, res, next) => {
    const { name, brand, price, quantity, category } = req.body;

    if (!name || !brand || !price || !quantity || !category) {
        return next(new ErrorHandler('Please enter all the details of the otufit', 400));
    }

    const outfit = await Outfit.create({name, price, quantity, brand, category});

    res.status(201).json({
        success: true,
        outfit
    });
})
