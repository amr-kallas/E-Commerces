import { createTheme } from '@mui/material'

const theme = (language: string) =>
  createTheme({
    direction: language == 'en' ? 'ltr' : 'rtl',
    palette: {
      secondary: {
        main: 'rgb(18, 48, 38)',
      },
    },
  })
export default theme
