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

// update cloth details: ADMIN route
exports.updateDetails = AsyncErrorHandler(async (req, res, next) => {
    const id = req.query.id;
    let outfit = await Outfit.findById(id);
    if (!outfit) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    if (req.files !== null) {
        // deleting images from cloudinary
        for (let i = 0; i < outfit.images.length; i++) {
          await cloudinary.v2.uploader.destroy(outfit.images[i].public_id);
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
    }
    
    outfit = await Outfit.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        findAndModify: false,
      });
    res.status(200).json({
        success: true,
        outfit,
    });
})

// delete cloth
exports.deleteCloth = AsyncErrorHandler(async (req, res, next) => {
    const id = req.query.id;
    const outfit = await Outfit.findOne({id});
    
    if (!outfit) {
        return next(new ErrorHandler('Product not found!!', 404));
    }

    for (let i = 0; i < outfit.images.length; i++) {
        await cloudinary.v2.uploader.destroy(outfit.images[i].public_id);
    }

    await outfit.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

// get all clothes: USER ROUTE
exports.getAllOutfits = AsyncErrorHandler(async(req, res, next) => {
    const outfits = await Outfit.find();
    res.status(200).json({
        success: true,
        outfits
    })
})