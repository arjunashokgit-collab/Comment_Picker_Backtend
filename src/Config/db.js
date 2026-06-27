const mongoose = require('mongoose');
const dns = require('dns');
const seedUsernames = require('./seedUsernames');
const seedComments = require('./seedComments');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.connectionString;

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Seed usernames if DEMO_USERNAMES is true
    if (process.env.DEMO_USERNAMES === 'true') {
      await seedUsernames();
    }
    
    // Seed comments if empty
    await seedComments();
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
