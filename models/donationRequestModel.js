const mongoose = require("mongoose");

const donationRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    amountNeeded: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

const donationRequestModel = mongoose.model('donationRequests', donationRequestSchema);
module.exports = donationRequestModel; 