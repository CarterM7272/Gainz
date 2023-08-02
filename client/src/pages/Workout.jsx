import Page from "../components/Page";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

import React, { useState } from 'react';
import { Box, Button, Stack, TextField} from '@mui/material';
import { QUERY_EXERCISE_BY_BODY_PART } from '../graphql/queries'; // Replace './queries' with the correct path to your 'queries.js' file
import { client } from '../App';

const headContent = (
  <>
    <title>Workouts</title>
    <meta name="description" content="This is where I create workouts." />  
    </>
);



export default function Workout() {
  // const props =  {
  //   option: workouts.map((option) =>  {
  //     const firstLetter = option.name[0].toUpperCase();
  //     return {
  //       firstLetter: firstLetter,
  //       ...option,
  //     }
  //   }),
  // }

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

      // Filter the exercises based on the search input
      const searchedExercises = exercisesFromServer.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      // Update the state with the filtered exercises
      setExercises(searchedExercises || []);
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
            {/* Render the fetched data */}
          {exercises.slice(0, 10).map((exercise) => (
            <Box key={exercise.name} sx={{ border: '3px solid blue', margin: '3px'}}>
              <h3>{exercise.name}</h3>
              <p>{exercise.bodyPart}</p>
              <p>{exercise.target}</p>
              <img src={exercise.gifUrl} alt={exercise.equipment} />
            </Box>
            ))}
          </Box>
          
        </Stack>
    </Page>
  );
}

// const workouts  = [
//   {name: 'Bench Press', target: 'Chest'}, {name: 'Pushup', target: 'Chest/Triceps'}, {name: 'calve raises', target: "Carson's height"}
// ];