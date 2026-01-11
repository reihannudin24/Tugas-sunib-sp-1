
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const connectDB = require('./utils/conf/connection');
const productRoutes = require('./routes/productRoutes');

connectDB();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});