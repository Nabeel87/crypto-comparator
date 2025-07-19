
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Header from './components/Header';
import Sidebar from './components/SideBar';
import Footer from './components/Footer';

import Compare from './pages/Compare';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Trends from './pages/Trends';

function App() {

  const theme = useTheme();

  return (
  
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: theme.palette.background.default }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* For spacing under AppBar */}
          <Toolbar /> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/trends' element={<Trends />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
