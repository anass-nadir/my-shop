const express = require("express");
const cors = require("cors");
const app = express();
const Routes = require('./routes')

require("./database");
require('./utils/passport')(app)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(
  cors({
    origin: process.env.PUBLIC_URL,
    optionsSuccessStatus: 200,
  })
);

app.use('/api', Routes)

app.listen(process.env.NODE_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.NODE_PORT}`);
});
