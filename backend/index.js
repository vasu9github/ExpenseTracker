import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'; 
import expenseRoutes from './routes/expenseRoute.js'; 
import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB();

const app = express();
const frontendUrl = 'https://expense-tracker-three-fawn-15.vercel.app'
app.use(cors(frontendUrl,'http://localhost:5173'));
app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth',authRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});