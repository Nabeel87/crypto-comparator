import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Avatar,
} from '@mui/material';
import CryptoContext from '../context/CryptoContext';

const Home = () => {
  const { coins, loading, error } = useContext(CryptoContext);

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color='text.primary'>
        🔥 Top 100 Cryptocurrencies
      </Typography>

      <Grid container spacing={2}>
        {coins.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                transition: '0.3s',
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
                    {/* <Tooltip title={coin.name}> */}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {coin.name.length > 12 ? `${coin.name.slice(0, 12)}...` : coin.name}
                    </Typography>
                    {/* </Tooltip> */}
                    <Typography variant="body2" color="text.secondary">
                      Symbol: {coin.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>

                <Typography mt={2} fontWeight="bold">
                  Price: ${coin.current_price.toLocaleString()}
                </Typography>

                <Typography
                  color={
                    coin.price_change_percentage_24h >= 0 ? 'green' : 'red'
                  }
                >
                  24h Change:{' '}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Typography>

                <Typography color="text.secondary">
                  Market Cap: 
                </Typography>
                <Typography color="text.secondary">
                  ${coin.market_cap.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;