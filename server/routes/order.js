const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { isConnected } = require('../config/db');

router.post('/', async (req, res) => {
  try {
    if (!isConnected()) {
      return res.status(201).json({ ...req.body, _id: Date.now().toString(), message: 'Order placed (offline mode)' });
    }
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    if (!isConnected()) return res.json([]);
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
