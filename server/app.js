
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import sortingRoutes from './routes/sortingRoutes.js';

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/sort', sortingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
