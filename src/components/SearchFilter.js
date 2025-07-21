import React from 'react';
import { Box } from '@mui/material';

const SearchFilter = ({ coins, setFilteredCoins }) => {
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const result = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
    setFilteredCoins(result);
  }, [search, coins, setFilteredCoins]);

  const filterByPrice = (order) => {
    const sorted = [...coins].sort((a, b) =>
      order === 'asc' ? a.current_price - b.current_price : b.current_price - a.current_price
    );
    setFilteredCoins(sorted);
  };

  const filterByMarketCap = (order) => {
    const sorted = [...coins].sort((a, b) =>
      order === 'asc' ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
    );
    setFilteredCoins(sorted);
  };

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={3} gap={2}>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '300px',
        }}
      />
      <Box display="flex" gap={1} flexWrap="wrap">
        <button onClick={() => filterByPrice('asc')}>Price ↑</button>
        <button onClick={() => filterByPrice('desc')}>Price ↓</button>
        <button onClick={() => filterByMarketCap('asc')}>Market Cap ↑</button>
        <button onClick={() => filterByMarketCap('desc')}>Market Cap ↓</button>
      </Box>
    </Box>
  );
};

export default SearchFilter;