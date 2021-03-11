const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const app = express();
const Routes = require('./routes');
const connectDb = require('./database');

const { isAuthenticated, currentUser } = require('@my-shop/common').Middlewares;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.PUBLIC_URL,
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ['set-cookie']
  })
);
const sessOptions = {
  name: 'my-shop-sess',
  secret: process.env.SESSION_SECRET,
  signed: false,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 1000
};
app.set('trust proxy', 1);

app.use(session(sessOptions));

app.use(currentUser);
app.use(isAuthenticated);

app.use('/api/cart', Routes);
app.all('*', (req, res) => {
  res.status(404).send('route not found');
});

connectDb
  .then(() => {
    console.info('MongoDB connected');
    app.listen(3000, () => {
      console.log(`🚀 Server running on port 3000`);
    });
  })
  .catch((err) => {
    console.error('Connection error', err.message);
  });
