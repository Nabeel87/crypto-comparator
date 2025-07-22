import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useContext } from 'react';
import CryptoContext from '../context/CryptoContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useContext(CryptoContext);

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={{ maxWidth: 200, mb: 1, marginTop:2 }}
    >
      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        disableUnderline // removes underline too
        sx={{
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <MenuItem value="usd">USD ($)</MenuItem>
        <MenuItem value="inr">INR (₹)</MenuItem>
        <MenuItem value="eur">EUR (€)</MenuItem>
        <MenuItem value="pkr">PKR (₨)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;