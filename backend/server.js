const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// MongoDB Schema and Model
const DataSchema = new mongoose.Schema({
    ts: { type: Date, required: true },
    machine_status: { type: Number, required: true },
    vibration: { type: Number, required: true },
});

const DataModel = mongoose.model('Data', DataSchema);

// API Endpoint for Filtering Data Based on Hourly Intervals
app.get('/api/filter/hourly', async (req, res) => {
    const { startTime } = req.query; // Get the startTime from query parameters
  
    try {
      // Filter data from MongoDB based on hourly intervals starting from startTime
      const filteredData = await DataModel.find({
        ts: {
          $gte: new Date(startTime), // Greater than or equal to startTime
          $lt: new Date(new Date(startTime).getTime() + 60 * 60 * 1000), // Less than startTime + 1 hour
        },
      });
  
      res.json(filteredData); // Send the filtered data as JSON response
    } catch (err) {
      console.error('Error filtering data:', err);
      res.status(500).send('Internal Server Error');
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
