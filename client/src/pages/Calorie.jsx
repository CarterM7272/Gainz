import React, { useState } from 'react'
import Page from '../components/Page';
import { Input, Button } from '@mui/material';

export default function Calorie() {

  const [input, setInput] = useState([{ value: '' }]);


/* getting compiling error for the "value" keyword as used in the above useState. I believe the second useState hook is creating the error but we need useState to set the calories based on what is entered by the user. I will comment it out below until we can solve this issue */

  // const [calorie, setCalorie] = useState();

  const addEntry = () => {
    setInput([...input, {value: ''}])
  }

  const handleChange = (index, event) => {
    const values = [...input];
    values[index].value = event.target.value;
    setInput(values);
  };

  const removeEntry = (index) => {
    const values = [...input];
    values.splice(index, 1);
    setInput(values);
  }

  return (
    <Page>
  <div sx={{display: 'flex', flexWrap: 'wrap'}}>
    <div className='container'>
    <h1>Calorie Total:</h1>
      {input.map((field, index) => (
        <div key={index}>
          <Input
            type="text"
            value={field.value}
            placeholder='Enter Calories'
            onChange={(e) => handleChange(index, e)}
          />
          <Button variant='contained' color="success">Submit</Button>
          <Button size="small" variant="contained" color="error" onClick={() => removeEntry(index)}>remove</Button>
        </div>
      ))}
        <Button onClick={addEntry} variant="contained">add</Button>
    </div>
  </div>
    </Page>
  );
}