const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/Config/db');
const authRoutes = require('./src/Routes/authRoutes');
const giveawayRoutes = require('./src/Routes/giveawayRoutes');
const instagramRoutes = require('./src/Routes/instagramRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Comment Picker API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/giveaways', giveawayRoutes);
app.use('/api/instagram', instagramRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Comment Picker API running on port ${PORT}`);
});
