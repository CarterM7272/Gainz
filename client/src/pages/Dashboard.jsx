import React from 'react';
import Page from "../components/Page";
import { Box, Button, Stack, TextField} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../graphql/queries';
import { DELETE_WORKOUT } from '../graphql/mutations';



const headContent = (
  <>
    <title>Change Me! - Home</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Dashboard() {

  const { loading: userLoading, error: userError, data: userData, refetch} = useQuery(QUERY_ME);

  const [deleteWorkout] = useMutation(DELETE_WORKOUT);

  const workouts = userData?.me?.workouts || [];

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const { data } = await deleteWorkout({
        variables: {
          workoutId: workoutId,
        }
      });
      console.log('Workout Deleted');
      refetch();
    } catch (error) {
      console.error('Error Deleting Workout');
    }
  }
  

  return (
    <Page isProtected={true} headContent={headContent}>
      <div sx={{display: 'flex', flexWrap: 'wrap'}}>
        <div className="container">
          <div>Dashboard</div>
          <div>TODO</div>
          <div>Add Calories for the week</div>
          <div>Add Favorite Work-Outs</div>
          <div>Add Goals</div>
          <div>Add Personal Records</div>

        </div>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          <h3>Saved Workouts</h3>
            {workouts.map((exercise) => (
              <Box 
                key={exercise.id} 
                sx={{ 
                  border: '2px solid black', 
                  margin: '3px', 
                  maxWidth: '200px',
                  borderRadius: '15px',
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <h3>{exercise.name}</h3>
                <p>{exercise.bodyPart}</p>
                <p>{exercise.target}</p>
                <img src={exercise.gifUrl} alt={exercise.equipment} style={{maxWidth: '100%'}}/>
                <Button onClick={() => handleDeleteWorkout(exercise.id)}>Delete Exercise</Button>
              </Box>
            ))}
          </Box>
    </Page>
  );
}
