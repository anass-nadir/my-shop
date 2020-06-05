require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const { ApolloServer } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const models = require("./models");

const getLoggedInUser = (req) => {
  const token = req.headers["x-auth-token"];
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session has been expired.");
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    loggedIn: getLoggedInUser(req),
  }),
  playground: process.env.NODE_ENV === "development" ? true : false,
  introspection: true,
  tracing: true,
});

apolloServer.applyMiddleware({
  app,
  path: "/api",
  cors: true,
  onHealthCheck: () =>
    new Promise((resolve, reject) => {
      if (db.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});
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

app.listen(process.env.NODE_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.NODE_PORT}`);
});
