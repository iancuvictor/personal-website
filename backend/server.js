import express from 'express';
import mongoose from 'mongoose';
import http, { createServer } from 'http';
import publicData from './routes/public.js';

const port = process.env.PORT;

const app = express();
const server = createServer(app);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/public', publicData);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
