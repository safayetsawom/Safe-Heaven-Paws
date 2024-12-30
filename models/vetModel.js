const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
}, { timestamps: true });

const vetModel = mongoose.model('vets', vetSchema);
module.exports = vetModel; 