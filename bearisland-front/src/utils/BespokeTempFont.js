import React from 'react';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function BespokeTempFont({fontImport, targetComponent}) {
  const bespokeFont = {
    fontFamily: 'BespokeFont',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('BespokeFont'),
      local('BespokeFont-Regular'),
      url(${fontImport}) format('woff')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };

  const bespokeFontTheme = createMuiTheme({
    typography: {
      fontFamily: 'BespokeFont',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [bespokeFont],
        },
      },
    },
  });

  return (
    <Container fixed>
        <ThemeProvider theme={bespokeFontTheme}>
        <CssBaseline />
            {targetComponent}
        </ThemeProvider>

      {/*So, I think this really sucks if how I understand it works...
        We loaded a new theme to load in a font, this will then load in
        the default font, this all makes for some bad performance, I think. */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
        </ThemeProvider>
    </Container>

    );
}
