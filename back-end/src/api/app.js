const express = require('express');
const userRouter = require('./routes/user');
const errorMiddleware = require('./middlewares/errorMidleware');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
