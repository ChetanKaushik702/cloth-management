const Outfit = require('../models/clothModel');
const AsyncErrorHandler = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// add a cloth to store ADMIN Route
exports.addOutfit = AsyncErrorHandler(async (req, res, next) => {
    const { name, brand, price, quantity, category } = req.body;

    if (!name || !brand || !price || !quantity || !category) {
        return next(new ErrorHandler('Please enter all the details of the outfit', 400));
    }

    const imageLinks = [];

    for (let i = 0; i < req.files.File.length; i++) {
        const result = await cloudinary.v2.uploader.upload(req.files.File[i].tempFilePath, {
            folder: "cloth"
        });

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }
    
    req.body.images = imageLinks;
    req.body.createdBy = req.user.id;

    const outfit = await Outfit.create(req.body);

    res.status(201).json({
        success: true,
        outfit
    });
})
