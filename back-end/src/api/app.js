const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const errorMiddleware = require('./middlewares/errorMidleware');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/user', userRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
