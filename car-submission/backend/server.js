const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars',carRoutes)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
