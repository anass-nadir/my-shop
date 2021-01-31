const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { passport } = require('./services');
const app = express();
const Routes = require('./routes');

require('./database');

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
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 24 * 1000 }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sessOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', Routes);

app.listen(process.env.NODE_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.NODE_PORT}`);
});
