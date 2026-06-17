const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { isConnected } = require('../config/db');

router.post('/', async (req, res) => {
  try {
    if (!isConnected()) return res.status(503).json({ message: 'Database unavailable' });
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    if (!isConnected()) return res.json([]);
    const reservations = await Reservation.find().sort({ date: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
