const express = require("express");
const router = express.Router();
const Vet = require("../models/vetModel");

// Get all vets
router.get("/", async (req, res) => {
    try {
        const vets = await Vet.find();
        res.json(vets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new vet
router.post("/create", async (req, res) => {
    try {
        const vet = new Vet(req.body);
        const newVet = await vet.save();
        res.status(201).json(newVet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 