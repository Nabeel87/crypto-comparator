import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from '@mui/material';
import CryptoContext from '../context/CryptoContext';
import CompareChart from '../components/CompareChart';
import CompareTable from '../components/CompareTable';

import { getCurrencySymbol } from '../utils/currencySymbol';

const Compare = () => {
  const { coins } = useContext(CryptoContext);
  const [coin1, setCoin1] = useState(null);
  const [coin2, setCoin2] = useState(null);

    const { currency } = useContext(CryptoContext);
    const CurrencySign = getCurrencySymbol(currency);

  const handleSelect = (id, setter) => {
    const coin = coins.find((c) => c.id === id);
    setter(coin);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        🔍 Compare Cryptocurrencies
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel>Select First Coin</InputLabel>
              <Select 
                value={coin1?.id || ''}
                onChange={(e) => handleSelect(e.target.value, setCoin1)}
                label="Select First Coin"
              >
                {coins.map((coin) => (
                  <MenuItem key={coin.id} value={coin.id}>
                    {coin.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel>Select Second Coin</InputLabel>
              <Select
                value={coin2?.id || ''}
                onChange={(e) => handleSelect(e.target.value, setCoin2)}
                label="Select Second Coin"
              >
                {coins.map((coin) => (
                  <MenuItem key={coin.id} value={coin.id}>
                    {coin.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <CompareTable coin1={coin1} coin2={coin2} sign={CurrencySign} />

      <CompareChart coin1={coin1} coin2={coin2} sign={CurrencySign} />
    </Box>
  );
};

export default Compare;
