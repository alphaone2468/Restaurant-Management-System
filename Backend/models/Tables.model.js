const mongoose= require('mongoose');

const TableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
    },
    capacity: {
        type: Number,
        enum: [2, 4, 6, 8],
        required: true
    },
    avaliableSeats : {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Occupied'],
        default: 'Available'
    },
},[{ timestamps: true }]);

module.exports = mongoose.model('Table', TableSchema);