const mongoose = require('mongoose');

const clothSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter name for the outfit']
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'Please enter outfit price']
    },
    quantity: {
        type: Number,
        min: 0,
        required: [true, 'Please enter outfit quantity']
    },
    brand: {
        type: String,
        trim: true,
        required: [true, 'Please enter the outfit brand']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            } 
        }
    ],
    category: {
        type: String,
        trim: true,
        required: [true, 'Please enter the outfit category']
    },
    addedOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('outfit', clothSchema);