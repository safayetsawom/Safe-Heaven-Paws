const Event = require('../models/eventModel');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;

    if (!title || !date || !location || !description) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({
      success: true,
      data: savedEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create event',
      error: error.message 
    });
  }
};
