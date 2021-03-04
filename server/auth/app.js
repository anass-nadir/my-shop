const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const { errorHandler } = require('@my-shop/common').Middlewares;
const { NotFoundError } = require('@my-shop/common').Errors;
// const { passport } = require('./services');
const app = express();
const Routes = require('./routes');

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
  secure: process.env.NODE_ENV !== 'test',
  maxAge: 60 * 60 * 24 * 1000
};
app.set('trust proxy', 1);

app.use(session(sessOptions));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/auth', Routes);

app.all('*', (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);
module.exports = app;
