import React, { useState } from 'react';
import Page from '../components/Page';
import { Input, Button, Grid, Box, Paper, ButtonGroup, Typography } from '@mui/material';

export default function Calorie() {

  const [input, setInput] = useState([{ food: '', calories: '' }]);
  const [totalCalories, setTotalCalories] = useState(0);

  const addEntry = () => {
    setInput([...input, { food: '', calories: '' }])
  }

  const handleChange = (index, event) => {
    const values = [...input];
    values[index][event.target.name] = event.target.value;
    setInput(values);
  };

  const handleSubmit = (index) => {
    const field = input[index];
    setTotalCalories(totalCalories + Number(field.calories));
    console.log(`Food: ${field.food}, Calories: ${field.calories}`);
  }

  const removeEntry = (index) => {
    const values = [...input];
    setTotalCalories(totalCalories - Number(values[index].calories));
    values.splice(index, 1);
    setInput(values);
  }
return (
    <Page>
      <Grid 
        container 
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" sx={{ border: '2px solid black', backgroundColor: 'beige', padding: 2, marginBottom: 3, borderRadius: '10px' }}>
          Calorie Tracker
        </Typography>
        {input.map((field, index) => (
          <Paper elevation={3} key={index} sx={{ margin: 2, padding: 2, backgroundColor: 'beige', border: '2px solid black', borderRadius: '10px' }}>
            <Box>
              <Input
                name="food"
                type="text"
                value={field.food}
                placeholder='Enter Food'
                onChange={(e) => handleChange(index, e)}
              />
              <Input
                name="calories"
                type="number"
                value={field.calories}
                placeholder='Enter Calories'
                onChange={(e) => handleChange(index, e)}
              />
              <ButtonGroup variant="contained" sx={{ marginTop: 2 }}>
                <Button sx={{backgroundColor: '#757ce8'}} onClick={() => handleSubmit(index)}>Submit</Button>
                <Button sx={{backgroundColor: '#757ce8'}} onClick={() => removeEntry(index)}>Remove</Button>
              </ButtonGroup>
            </Box>
          </Paper>
        ))}
        <Button onClick={addEntry} variant="contained" sx={{ marginTop: 2, backgroundColor: '#757ce8' }}>Add</Button>
        <Paper elevation={3} sx={{ margin: 2, padding: 2, backgroundColor: 'beige', border: '2px solid black', borderRadius: '10px', marginTop: 5 }}>
          <Typography variant="h6">Total Calories: {totalCalories}</Typography>
        </Paper>
      </Grid>
    </Page>
  );
}