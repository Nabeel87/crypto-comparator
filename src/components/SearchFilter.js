// components/SearchFilter.js
import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const SearchFilter = ({ coins, setFilteredCoins }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
    );
    setFilteredCoins(filtered);
  };

  const sortByPrice = (order) => {
    const sorted = [...coins].sort((a, b) =>
      order === 'asc'
        ? a.current_price - b.current_price
        : b.current_price - a.current_price
    );
    setFilteredCoins(sorted);
  };

  const sortByMarketCap = (order) => {
    const sorted = [...coins].sort((a, b) =>
      order === 'asc' ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
    );
    setFilteredCoins(sorted);
  };

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" gap={2} mb={3}>
      <TextField
        label="Search coin"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        size="small"
        sx={{ width: '250px' }}
      />

      <Box display="flex" gap={1} flexWrap="wrap">
        <Button onClick={() => sortByPrice('asc')} variant="outlined">Price ↑</Button>
        <Button onClick={() => sortByPrice('desc')} variant="outlined">Price ↓</Button>
        <Button onClick={() => sortByMarketCap('asc')} variant="outlined">Market Cap ↑</Button>
        <Button onClick={() => sortByMarketCap('desc')} variant="outlined">Market Cap ↓</Button>
      </Box>
    </Box>
  );
};

export default SearchFilter;
