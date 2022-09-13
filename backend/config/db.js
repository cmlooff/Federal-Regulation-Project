/** Mongo DB Connection
 *
 * Pulling mongoURI from the default.json
 */

const mongoose = require('mongoose');
const config = require('config');
const colors = require('colors');
const db = config.get('mongoURI');

// This outputs a promise
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });

    console.log('MongoDB Connected...'.green.inverse.bold);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
