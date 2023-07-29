const { gql } = require('apollo-server-express');

const typeDefs = gql`

  scalar Date



  type workout {
    _id: ID!
    chest: [
      {
        name: String,
        weight: INT,
        reps: INT,
      }
    ]
    back: []
    core: []
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
    workouts: [workout]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(firstName: String, lastName: String, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
