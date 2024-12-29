const donationRequestModel = require("../models/donationRequestModel");

// Initial donation balance
let donationBalance = 2000;

// Submit new donation request
const submitRequest = async (req, res) => {
    try {
        const { name, reason, amountNeeded, contact } = req.body;
        const newRequest = new donationRequestModel({
            name,
            reason,
            amountNeeded,
            contact,
            userId: req.body.userId
        });
        await newRequest.save();
        res.status(200).send({
            success: true,
            message: "Request submitted successfully",
            request: newRequest
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in submitting request",
            error
        });
    }
};

// Get all requests (for admin)
const getAllRequests = async (req, res) => {
    try {
        const requests = await donationRequestModel.find({});
        res.status(200).send({
            success: true,
            requests
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting requests",
            error
        });
    }
};

// Get user's requests
const getUserRequests = async (req, res) => {
    try {
        const requests = await donationRequestModel.find({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            requests
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting user requests",
            error
        });
    }
};

// Approve request
const approveRequest = async (req, res) => {
    try {
        const request = await donationRequestModel.findById(req.params.id);
        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Request not found"
            });
        }

        if (donationBalance < request.amountNeeded) {
            return res.status(400).send({
                success: false,
                message: "Insufficient donation balance"
            });
        }

        request.status = 'approved';
        await request.save();
        donationBalance -= request.amountNeeded;

        res.status(200).send({
            success: true,
            message: "Request approved successfully",
            newBalance: donationBalance
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in approving request",
            error
        });
    }
};

// Reject request
const rejectRequest = async (req, res) => {
    try {
        const request = await donationRequestModel.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Request rejected successfully",
            request
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in rejecting request",
            error
        });
    }
};

// Get donation balance
const getDonationBalance = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            balance: donationBalance
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting balance",
            error
        });
    }
};

module.exports = {
    submitRequest,
    getAllRequests,
    getUserRequests,
    approveRequest,
    rejectRequest,
    getDonationBalance
}; 