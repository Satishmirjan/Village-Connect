const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

// POST route to create a new user (booking)
router.post('/register', async (req, res) => {
  try {
    const { name, product_name, start_date, end_date } = req.body;

    // Validate required fields
    if (!name || !product_name || !start_date || !end_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure the dates are in the correct format (Date type)
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Check if the dates are valid
    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Create a new booking (User in your case)
    const newUser = new User({
      name,
      product_name,
      start_date: startDate,
      end_date: endDate
    });

    // Save the new booking
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'Booking confirmed', booking: newUser });
    console.log('Booking confirmed:', newUser);
  } catch (error) {
    // Handle error and return response
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

module.exports = router;
