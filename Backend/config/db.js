const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/restaurant-management", {
        useNewUrlParser: true,  
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
}

connectDB();