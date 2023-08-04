import Page from "../components/Page";
import React, { useState } from 'react';
import { Box, Button, Stack, TextField} from '@mui/material';
import { QUERY_EXERCISE_BY_BODY_PART } from '../graphql/queries';
import { client } from '../App';

const headContent = (
  <>
    <title>Workouts</title>
    <meta name="description" content="This is where I create workouts." />
  </>
);

export default function Workout() {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleSearch = async () => {
    if (search) {
      try {
        console.log('Search Query:', search);
        const { data } = await client.query({
          query: QUERY_EXERCISE_BY_BODY_PART,
        });

        const exercisesFromServer = data.getFromExerciseDb;
        const searchedExercises = exercisesFromServer.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(search) ||
            exercise.target.toLowerCase().includes(search) || 
            exercise.equipment.toLowerCase().includes(search) ||
            exercise.bodyPart.toLowerCase().includes(search)
        );

        setExercises(searchedExercises,  []);
        setSearch('');
        console.log('Server Response:', data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <Page headContent={headContent}>
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
          <Box position="relative" mb="72px">
            <TextField
              sx={{
                input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
                width: { lg: '800px', xs: '350px' },
                backgroundColor: '#fff',
                borderRadius: '40px',
              }}
              height="76px"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Exercises"
              type="text"
            />
            <Button
              variant="contained"
              sx={{
                color: '#fff',
                textTransform: 'none',
                width: { lg: '175px', xs: '80px' },
                fontSize: { lg: '20px', xs: '14px' },
                height: '56px',
                position: 'absolute',
                right: '0',
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {exercises.slice(0, 10).map((exercise) => (
              <Box 
                key={exercise.name} 
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
              </Box>
            ))}
          </Box>
        </Stack>
    </Page>
  );
}