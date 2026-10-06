// Bring in mongoose tool
const mongoose = require('mongoose');

// Connect to database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB error: ' + error.message);
    process.exit(1);
  }
}

// Share this function
module.exports = connectDB;
