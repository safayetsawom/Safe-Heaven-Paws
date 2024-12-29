const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { 
    submitRequest, 
    getAllRequests, 
    getUserRequests,
    approveRequest,
    rejectRequest,
    getDonationBalance
} = require("../controllers/donationCtrl");

// Routes
router.post("/request", authMiddleware, submitRequest);
router.get("/requests", authMiddleware, getAllRequests);
router.get("/user-requests", authMiddleware, getUserRequests);
router.post("/approve/:id", authMiddleware, approveRequest);
router.post("/reject/:id", authMiddleware, rejectRequest);
router.get("/balance", getDonationBalance);

module.exports = router; 