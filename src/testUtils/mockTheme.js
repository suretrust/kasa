import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import React from 'react'

const MockTheme = ({ children }) => {
  const theme = createTheme({})

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MockTheme
