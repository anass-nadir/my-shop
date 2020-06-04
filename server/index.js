const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const db = require('./db')
const Routes = require('./routes')
const app = express();
app.use(cors({
  origin: 'https://localhost:3000/',
  optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json());
app.use('/api', Routes)

app.listen("3002", () => console.log("Server running on port 3002"))
