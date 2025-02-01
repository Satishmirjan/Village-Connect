const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();



// Middleware
app.use(express.json());  // To parse JSON in request bodies
app.use(cors());          // Enable CORS (Cross-Origin Resource Sharing)

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the MERN backend!');
});

// Set up server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON bodies



// Your other app logic...



