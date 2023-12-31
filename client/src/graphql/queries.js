import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMeQuery {
    me {
      _id
      firstName
      lastName
      email
      createdAt
      updatedAt
      workouts {
        id
        name
        bodyPart
        target
        equipment
        gifUrl
      }
    }
  }
`;

export const QUERY_EXERCISE_BY_BODY_PART = gql`
  query getExerciseByBodyPart {
    getFromExerciseDb {
      bodyPart
      equipment 
      gifUrl 
      id 
      name 
      target
    }
  }
`;







