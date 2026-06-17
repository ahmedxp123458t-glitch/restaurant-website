const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservation');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant API is running');
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
