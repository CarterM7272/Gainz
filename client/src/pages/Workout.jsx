import Page from "../components/Page";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const headContent = (
  <>
    <title>Workouts</title>
    <meta name="description" content="This is where I create workouts." />  
    </>
);



export default function Workout() {
  const props =  {
    option: workouts.map((option) =>  {
      const firstLetter = option.name[0].toUpperCase();
      return {
        firstLetter: firstLetter,
        ...option,
      }
    }),
  }


  return (
    <Page isProtected={false} headContent={headContent}>
      <Autocomplete
      id="grouped-demo"
      options={props.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Workouts" />}
    />
    </Page>
  );
}

const workouts  = [
  {name: 'Bench Press', target: 'Chest'}, {name: 'Pushup', target: 'Chest/Triceps'}, {name: 'calve raises', target: "Carson's height"}
];