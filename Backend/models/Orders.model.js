const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
},{ _id : false });

const OrdersSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    },
    orderType: {
        type: String,
        enum: ['Dine In', 'Take Away'],
        required: true
    },
    orderedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    items:[
        ItemSchema
    ],
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Preparing', 'Ready', 'Served'],
        default: 'Pending'
    },
    cookingInstructions: {
        type: String,
        default: ''
    }
}, { timestamps: true} );

module.exports = mongoose.model('Order', OrdersSchema);