import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUserMutation($email: String!, $password: String!, $firstName: String, $lastName: String) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
    }
  }
`;
export const SAVE_WORKOUT = gql`
  mutation SaveWorkoutMutation(
    $userId: ID!
    $bodyPart: String!
    $equipment: String
    $gifUrl: String
    $name: String!
    $target: String!
  ) {
    saveWorkout(
      userId: $userId
      bodyPart: $bodyPart
      equipment: $equipment
      gifUrl: $gifUrl
      name: $name
      target: $target
    ) {
      bodyPart
      equipment
      gifUrl
      id
      name
      target
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation deleteWorkout($workoutId: ID!) {
    deleteWorkout(workoutId: $workoutId) {
      id
      name
      bodyPart
      target
      equipment
      gifUrl
    }
  }
`;
