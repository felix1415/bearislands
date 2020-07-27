import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
// const theme = createMuiTheme({


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d65a31',
    },
    secondary: {
      main: '#393e46',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#393e46',
      default: '#222831',
    },
    text: {
      primary: '#eeeeee',
    },
  },
});

export default theme;

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });