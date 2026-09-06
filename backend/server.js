import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import cors from 'cors';
import publicData from './routes/public.js';
import adminRoutes from './routes/admin.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const port = process.env.PORT;

const app = express();
const server = createServer(app);


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cookieParser());
app.use('/api/uploads', express.static(path.join('uploads')))

app.use('/api/public', publicData);
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server up and running!' })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
