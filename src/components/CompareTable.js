import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
  Avatar,
  Box,
  Chip,
} from '@mui/material';

const CompareTable = ({ coin1, coin2, sign }) => {
  if (!coin1 || !coin2) return null;

  const rows = [
    { label: 'Current Price', value1: `${sign}${coin1.current_price.toLocaleString()}`, value2: `${sign}${coin2.current_price.toLocaleString()}` },
    { label: '24h % Change', value1: `${coin1.price_change_percentage_24h.toFixed(2)}%`, value2: `${coin2.price_change_percentage_24h.toFixed(2)}%` },
    { label: 'Market Cap', value1: `${sign}${coin1.market_cap.toLocaleString()}`, value2: `${sign}${coin2.market_cap.toLocaleString()}` },
    { label: '24h Volume', value1: `${sign}${coin1.total_volume.toLocaleString()}`, value2: `${sign}${coin2.total_volume.toLocaleString()}` },
    { label: 'Circulating Supply', value1: coin1.circulating_supply.toLocaleString(), value2: coin2.circulating_supply.toLocaleString() },
    { label: 'Total Supply', value1: coin1.total_supply?.toLocaleString() || 'N/A', value2: coin2.total_supply?.toLocaleString() || 'N/A' },
    { label: 'ATH (All Time High)', value1: `${sign}${coin1.ath.toLocaleString()}`, value2: `${sign}${coin2.ath.toLocaleString()}` },
    { label: 'ATL (All Time Low)', value1: `${sign}${coin1.atl.toLocaleString()}`, value2: `${sign}${coin2.atl.toLocaleString()}` },
    { label: 'Market Cap Rank', value1: `#${coin1.market_cap_rank}`, value2: `#${coin2.market_cap_rank}` },
    { label: 'Price BTC', value1: `${coin1.current_price_btc} BTC`, value2: `${coin2.current_price_btc} BTC` },
  ];

  return (
    <Box mt={5}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color='text.primary'>
        🧮 Market Metrics Comparison
      </Typography>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#20232a' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Metric</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={coin1.image} alt={coin1.name} sx={{ width: 24, height: 24 }} />
                  {coin1.name}
                  <Chip label={coin1.symbol.toUpperCase()} size="small" />
                </Box>
              </TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={coin2.image} alt={coin2.name} sx={{ width: 24, height: 24 }} />
                  {coin2.name}
                  <Chip label={coin2.symbol.toUpperCase()} size="small" />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} hover>
                <TableCell sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                <TableCell>{row.value1}</TableCell>
                <TableCell>{row.value2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompareTable;