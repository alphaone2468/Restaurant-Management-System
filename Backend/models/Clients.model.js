const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    }
    
}, { timestamps: true} );

module.exports = mongoose.model('Client', ClientSchema);