const { gql } = require('apollo-server-express');

const typeDefs = gql`

  scalar Date
  
  scalar JSON


  type Workout {
    bodyPart: String
    equipment: String 
    gifUrl: String 
    id: String 
    name: String 
    target: String
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
    workouts: [Workout]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getWorkouts(query: String!): [Workout]
    getFromExerciseDb(queryString: String): JSON
  }

  type Mutation {
    addUser(firstName: String, lastName: String, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
