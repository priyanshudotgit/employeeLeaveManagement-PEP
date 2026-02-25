import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import leaveRoutes from './routes/leave.route.js';
import reimbursementRoutes from './routes/reimbursement.route.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL, "https://employee-lms-silk.vercel.app", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/reimbursements', reimbursementRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});