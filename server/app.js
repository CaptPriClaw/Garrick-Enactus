const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Custom modules
const connectDB = require('./config/db');
const sortingRoutes = require('./routes/sortingRoutes');

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/sort', sortingRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
