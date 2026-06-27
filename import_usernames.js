const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Username = require('./src/Models/Username');

const importUsernames = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');

    // Path to the usernames.json file
    const jsonPath = path.join(__dirname, '..', 'comment-picker-policy', 'usernames.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`JSON file not found at: ${jsonPath}`);
    }

    const fileContent = fs.readFileSync(jsonPath, 'utf8');
    const userObjects = JSON.parse(fileContent);

    if (!Array.isArray(userObjects)) {
      throw new Error('JSON format is not an array');
    }

    const usernamesToImport = userObjects.map(obj => obj.username.trim()).filter(Boolean);
    console.log(`Found ${usernamesToImport.length} usernames in JSON file.`);

    // Fetch existing usernames to avoid duplicate key errors
    const existingDocs = await Username.find({ username: { $in: usernamesToImport } }, 'username');
    const existingUsernamesSet = new Set(existingDocs.map(d => d.username));

    const newDocs = usernamesToImport
      .filter(username => !existingUsernamesSet.has(username))
      .map(username => ({ username }));

    console.log(`Of these, ${existingUsernamesSet.size} already exist in the database.`);
    console.log(`Attempting to insert ${newDocs.length} new usernames...`);

    if (newDocs.length > 0) {
      const result = await Username.insertMany(newDocs, { ordered: false });
      console.log(`Successfully added ${result.length} usernames.`);
    } else {
      console.log('No new usernames to add.');
    }

  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
};

importUsernames();
