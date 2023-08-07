const { gql } = require('apollo-server-express');

const typeDefs = gql`

  scalar Date


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
    getFromExerciseDb: [Workout]
  }

  type Mutation {
    addUser(firstName: String, lastName: String, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveWorkout(userId: ID!, bodyPart: String!, equipment: String, gifUrl: String, name: String!, target: String!): Workout  
    deleteWorkout(workoutId: ID!): Workout }
`;

module.exports = typeDefs;
