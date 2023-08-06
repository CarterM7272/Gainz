import React, { useState } from 'react';
import Page from '../components/Page';
import { Input, Button, Grid, Box, Paper, ButtonGroup, Typography, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

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
      <CssBaseline/>
      <Grid 
        container 
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" color="#e53935" sx={{ borderBottom: '1.5px solid black', padding: 2, marginBottom: 3, borderRadius: '10px' }}>
          Calorie Tracker
        </Typography>
        {input.map((field, index) => (
          <Paper elevation={3} key={index}  sx={{ margin: 2, p: 3, border: '1.5px solid black', borderRadius: '10px' }}>
            <Box justifyContent={"center"}>
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
              <Stack direction={'row'} justifyContent={"center"} spacing={2} sx={{ p:1 }}>
                <Button variant="contained" color = 'secondary'  onClick={() => handleSubmit(index)}>Submit</Button>
                <Button variant="contained" color = 'secondary' onClick={() => removeEntry(index)}>Remove</Button>
              </Stack>
            </Box>
          </Paper>
        ))}
        <Button onClick={addEntry} variant="contained" color = 'secondary' sx={{ marginTop: 2 }}>Add</Button>
        <Stack direction={'row'} justifyContent={"center"} spacing={2}>
        <Paper elevation={3} direction={'row'} sx={{ margin: 2, padding: 2, border: '1.5px solid black', borderRadius: '10px', marginTop: 5 }}>
          <Typography variant="h6">Total Calories:</Typography> 
          <Typography variant="h6" color="#e53935">{totalCalories}</Typography>
        </Paper>
        </Stack>
      </Grid>
    </Page>
  /* <ButtonGroup  sx={{ marginTop: 2 }}> */
  );
}