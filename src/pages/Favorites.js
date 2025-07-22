import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from '@mui/material';

import { IconButton, Tooltip } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

import CryptoContext from '../context/CryptoContext';
import CoinDetailModal from '../components/CoinDetailModal';
import { getCurrencySymbol } from '../utils/currencySymbol';

const Favorites = () => {
  const { coins, loading, error, currency } = useContext(CryptoContext);
  const [favorites, setFavorites] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const favCoins = coins.filter((coin) => favorites.includes(coin.id));
    setFilteredCoins(favCoins);
  }, [coins, favorites]);

  const CSign = getCurrencySymbol(currency);

  const handleOpen = (coin) => {
    setSelectedCoin(coin);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );

  if (filteredCoins.length === 0)
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="text.secondary">
          No favorite coins found.
        </Typography>
      </Box>
    );

  const toggleFavorite = (coinId) => {
    const updatedFavorites = favorites.includes(coinId)
      ? favorites.filter(id => id !== coinId)
      : [...favorites, coinId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
        ⭐ Your Favorite Coins
      </Typography>

      <Grid container spacing={2}>
        {filteredCoins.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <Card
              onClick={() => handleOpen(coin)}
              sx={{
                p: 2,
                borderRadius: 3,
                transition: '0.3s',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={coin.image} alt={coin.name} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {coin.name.length > 12
                        ? `${coin.name.slice(0, 12)}...`
                        : coin.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Symbol: {coin.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>

                <Typography mt={2} fontWeight="bold">
                  Price: {CSign}
                  {coin.current_price.toLocaleString()}
                </Typography>

                <Typography
                  color={
                    coin.price_change_percentage_24h >= 0 ? 'green' : 'red'
                  }
                >
                  24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                </Typography>

                <Typography color="text.secondary">Market Cap:</Typography>
                <Typography color="text.secondary">
                  {CSign}
                  {coin.market_cap.toLocaleString()}
                </Typography>

                <Tooltip title={favorites.includes(coin.id) ? 'Remove from Favorites' : 'Add to Favorites'}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // stop card click
                      toggleFavorite(coin.id);
                    }}
                    sx={{ position: 'absolute', top: 2, right: 10 }}
                  >
                    {favorites.includes(coin.id) ? <Star color="warning" /> : <StarBorder />}
                  </IconButton>
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CoinDetailModal open={open} onClose={handleClose} coin={selectedCoin} />
    </Box>
  );
};

export default Favorites;
