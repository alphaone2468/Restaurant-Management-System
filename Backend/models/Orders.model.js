const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    },
    orderType: {
        type: String,
        enum: ['Dine-In', 'Takeaway'],
        required: true
    },
    items:[{
        itemsId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    tableNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Preparing', 'Ready', 'Served'],
        default: 'Pending'
    },
}, { timestamps: true} );

module.exports = mongoose.model('Order', OrdersSchema);