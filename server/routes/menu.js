const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { isConnected } = require('../config/db');

router.get('/', async (req, res) => {
  try {
    if (!isConnected()) return res.json([]);
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
