import React, { useContext } from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, IconButton, Typography
} from '@mui/material';
import { Home, CompareArrows, Star, LightMode, DarkMode, Timeline } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ToggleThemeContext } from '../ToggleThemeContext';

const Sidebar = () => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ToggleThemeContext);

  const navItems = [
    { label: 'Dashboard', icon: <Home />, path: '/' },
    { label: 'Compare', icon: <CompareArrows />, path: '/compare' },
    { label: 'Favorites', icon: <Star />, path: '/favorites' },
    { label: 'Trends', icon: <Timeline />, path: '/trends' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          🪙 CryptoApp
        </Typography>
      </Box>

      <List>
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  px: 3,
                  py: 1.5,
                  mb: 0.5,
                  borderRadius: 2,
                  transition: '0.3s',
                  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                  color: isActive ? '#fff' : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: isActive
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#fff' : theme.palette.primary.main }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;