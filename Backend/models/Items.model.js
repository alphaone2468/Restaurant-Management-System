const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
    },
    image: {
        type: String,
        required: true
    },
    preparationTime: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},{ timestamps: true} );

module.exports = mongoose.model('Item', ItemSchema);