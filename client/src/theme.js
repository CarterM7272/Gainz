import { createTheme,} from '@mui/material/styles';
import { colors } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.grey[800],
    },
    secondary: {
      main: colors.pink[600],
    }
  },
});

export default theme;