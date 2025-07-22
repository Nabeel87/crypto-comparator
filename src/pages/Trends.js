import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import CryptoContext from '../context/CryptoContext';
import { fetchCoinHistory } from '../api/api';
import { getCurrencySymbol } from '../utils/currencySymbol';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const Trend = () => {
  const { coins } = useContext(CryptoContext);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [days, setDays] = useState(7);
  const [history, setHistory] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState(['price', 'market_cap', 'volume']); // default

  const {currency} = useContext(CryptoContext);
  const CurrencySign = getCurrencySymbol(currency);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCoin) return;
      const res = await fetchCoinHistory(selectedCoin, days);
      setHistory(res);
    };

    fetchData();
  }, [selectedCoin, days]);

  const handleMetricChange = (event, newMetrics) => {
    if (newMetrics.length) setSelectedMetrics(newMetrics); // prevent empty selection
  };

  const getDatasets = () => {
    if (!history) return [];

    const datasets = [];

    if (selectedMetrics.includes('price')) {
      datasets.push({
        label: `Price ${CurrencySign}`,
        data: history.prices.map((p) => p[1]),
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        pointRadius: 2,
        tension: 0.3,
        fill: true,
      });
    }

    if (selectedMetrics.includes('market_cap')) {
      datasets.push({
        label: 'Market Cap',
        data: history.market_caps.map((p) => p[1]),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        pointRadius: 2,
        tension: 0.3,
        fill: true,
      });
    }

    if (selectedMetrics.includes('volume')) {
      datasets.push({
        label: 'Volume',
        data: history.total_volumes.map((p) => p[1]),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        pointRadius: 2,
        tension: 0.3,
        fill: true,
      });
    }

    return datasets;
  };

  const chartData = {
    labels: history?.prices.map((p) => new Date(p[0]).toLocaleDateString()) || [],
    datasets: getDatasets(),
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
        📈 Cryptocurrency Trend Analysis
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <FormControl fullWidth sx={{ mb: 3, width: 300 }}>
          <InputLabel>Select Coin</InputLabel>
          <Select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            label="Select Coin"
          >
            {coins.map((coin) => (
              <MenuItem key={coin.id} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 3, width: 300, marginLeft: 5 }}>
          <InputLabel>Select Days</InputLabel>
          <Select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            label="Select Days"
          >
            <MenuItem value={7}>Last 7 Days</MenuItem>
            <MenuItem value={30}>Last 30 Days</MenuItem>
            <MenuItem value={90}>Last 90 Days</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={selectedMetrics}
          onChange={handleMetricChange}
          aria-label="chart data"
          color="primary"
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'left',
            mt: 2,
          }}
        >
          {[
            { label: `💵 Price ${CurrencySign}`, value: 'price', color: '#2196f3' },
            { label: '🏦 Market Cap', value: 'market_cap', color: '#4caf50' },
            { label: '📊 Volume', value: 'volume', color: '#ff9800' },
          ].map((btn) => (
            <ToggleButton
              key={btn.value}
              value={btn.value}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                border: `2px solid ${btn.color}`,
                color: btn.color,
                '&.Mui-selected': {
                  backgroundColor: btn.color,
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: `${btn.color}20`, // light transparent
                },
                px: 3,
                py: 1,
              }}
            >
              {btn.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      {history && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Line data={chartData} />
        </Paper>
      )}
    </Box>
  );
};

export default Trend;
