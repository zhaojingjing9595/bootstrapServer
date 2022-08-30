import express from 'express';
import colors from 'colors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';

dotenv.config();

connectDB();

const app = new express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => { 
    res.send('Welcome to the root')
})

app.listen(PORT, console.log(`server is running on port ${PORT}...`.yellow.bold));