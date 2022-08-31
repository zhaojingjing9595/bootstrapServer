import express from 'express';
import colors from 'colors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import serverRoutes from './routes/serverRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = new express();
const PORT = process.env.PORT || 8000;

app.use(express.json())

app.get('/', (req, res) => { 
    res.send('Welcome to the root')
})

app.use('/user', userRoutes)

app.use('/server-connect', serverRoutes)

app.use(notFound);
app.use(errorHandler)

app.listen(PORT, console.log(`server is running on port ${PORT}...`.yellow.bold));