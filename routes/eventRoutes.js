const express = require('express');
const { getEvents, createEvent } = require('../controllers/eventController');
const router = express.Router();

router.get('/', getEvents); // Fetch all events
router.post('/create', createEvent); // Create a new event

module.exports = router;
