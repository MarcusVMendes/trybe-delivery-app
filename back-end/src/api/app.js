const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
<<<<<<< HEAD
const adminRouter = require('./routes/admin');
=======
const productRouter = require('./routes/product');
>>>>>>> e716b2e5dbf38385fd5299c8c7b23216d4f63a81
const errorMiddleware = require('./middlewares/errorMidleware');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/user', userRouter);
<<<<<<< HEAD
app.use('/admin', adminRouter);
=======
app.use('/products', productRouter);
>>>>>>> e716b2e5dbf38385fd5299c8c7b23216d4f63a81

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
