const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ordersAssigned: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
}, { timestamps: true} );

module.exports = mongoose.model('Chef', ChefSchema); 