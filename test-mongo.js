// test-mongo.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

(async () => {
  try {
    // Now process.env.MONGODB_URI should be defined.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
})();