import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ToggleThemeContext = createContext(); // Create context

export const ToggleThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: { default: '#f0f0f0', paper: '#fff' },
                text: { primary: '#000' },
              }
            : {
                background: { default: '#121212', paper: '#1e1e1e' },
                text: { primary: '#fff' },
              }),
        },
      }),
    [mode]
  );

  return (
    <ToggleThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleThemeContext.Provider>
  );
};