import React, { useState } from 'react';
import App from './App';
// Material-UI stuff
import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// TODO: Create a separate file for this
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Container from '@material-ui/core/Container';

export default function Main() {
  const [theme, setTheme] = useState({
    palette: {
      type: 'dark',
      primary: purple,
      secondary: green
    },
    status: {
      danger: 'orange'
    }
  });
  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    setTheme({
      palette: {
        type: newPaletteType,
        primary: purple,
        secondary: green
      },
      status: {
        danger: 'orange'
      }
    });
  };
  const muiThemeApp = createMuiTheme(theme);
  return (
    <ThemeProvider theme={muiThemeApp}>
      <CssBaseline />
      <Container maxWidth="lg">
        <App
          toggleDarkTheme={toggleDarkTheme}
          isDarkMode={theme.palette.type === 'dark'}
        />
      </Container>
    </ThemeProvider>
  );
}
