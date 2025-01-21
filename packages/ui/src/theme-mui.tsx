import React from 'react'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
    },
  },
})

export const ThemeProvider = ({ children }: { children: any }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
}
