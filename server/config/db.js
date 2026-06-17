const mongoose = require('mongoose');

let connected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant', { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    connected = true;
  } catch (error) {
    console.warn(`MongoDB not available (${error.message}). API endpoints will return empty data.`);
    connected = false;
  }
};

const isConnected = () => connected;

module.exports = { connectDB, isConnected };
