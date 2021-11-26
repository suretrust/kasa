import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600
  },
  palette: {
    primary: {
      dark: '#512DA8',
      main: '#673AB7',
      light: '#D1C4E9',
      contrastText: '#FFFFFF'
    },
    secondary: {
      dark: '#512DA8',
      main: '#D1C4E9',
      light: '#D1C4E9',
      contrastText: '#512DA8'
    }
  }
})

theme = responsiveFontSizes(theme)

export default theme
