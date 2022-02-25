const express = require('express');
const { join } = require('path');
const cors = require('cors');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');

const errorMiddleware = require('./middlewares/errorMidleware');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/user', userRouter);

app.use('/admin', adminRouter);

app.use('/products', productRouter);

app.use('/images', express.static(join(__dirname, '..', '..', 'public')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
