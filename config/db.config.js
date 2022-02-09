const mongoose = require('mongoose');
const { MONGODB_URL } = process.env;

async function connectDB() {
  try {
    const { connection } = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to DB: ${connection.name}`);
  } catch (error) {
    console.log(`Error while trying to connect to DB: ${error.message}`);
  }
}

module.exports = connectDB;
