const { gql } = require("apollo-server-express");
module.exports = gql`
  scalar Date
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date
    updatedAt: Date
  }
  type Token {
    token: String!
  }

  extend type Query {
    loggedUser: User
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): Token!
    login(email: String!, password: String!): Token!
  }
`;
