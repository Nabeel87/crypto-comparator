// src/components/Header.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ToggleThemeContext } from '../ToggleThemeContext';

const Header = () => {
  const { toggleColorMode, mode } = useContext(ToggleThemeContext);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary,
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold">
          🪙 Crypto Comparator
        </Typography>
        <Box>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;