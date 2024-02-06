// src/theme.ts
'use client';
import { createTheme } from '@mui/material/styles';

// https://mui.com/material-ui/guides/nextjs/
const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      background: { default: '#262626' },
      mode: 'dark',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "body": {
            "& *::selection": {
              backgroundColor: "#4a4a4a"
            }
          }
        }
      }
    }
  });

  
// const theme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });

export default theme;
