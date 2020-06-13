const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const db = require("./db");
const app = express();
const passport = require('passport');
const Routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(
  cors({
    origin: process.env.PUBLIC_URL,
    optionsSuccessStatus: 200,
  })
);

db.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
).on("open", () => console.info("MongoDB connected"));

app.use(express.json());
app.use(passport.initialize());
app.use('/api', Routes)
app.get('/auth/google/callback/', passport.authenticate('google', {
  session: false
}), (req, res) => {
  const {
    token
  } = req.user
  res.redirect(`${process.env.PUBLIC_URL}/signin?auth-token=${token}`);
});
app.listen(process.env.NODE_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.NODE_PORT}`);
});
