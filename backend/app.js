// server.js or index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import connectDB from './config/mongo.js';
import authRouter from './routes/authRouter.js';
import todoRouter from './routes/todoRouter.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
    collectionName: 'sessions',
    ttl: 7 * 24 * 60 * 60, // 1 week
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

app.get('/', (req, res) => res.send("API get working"));
app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
