'use client'

import { ThemeProvider, createTheme } from '@repo/ui'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a9461',
    },
  },
})

export function ThemeMUIProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // @ts-expect-error
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
