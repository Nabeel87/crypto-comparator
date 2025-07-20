import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  BarChart,
  ShowChart,
} from '@mui/icons-material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const CoinDetailModal = ({ open, handleClose, coin }) => {
  const theme = useTheme();

  if (!coin) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={coin.image}
            alt={coin.name}
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {coin.name} ({coin.symbol.toUpperCase()})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rank: {coin.market_cap_rank}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>
          <InfoRow
            icon={<AttachMoney color="primary" />}
            label="Price"
            value={`$${coin.current_price.toLocaleString()}`}
          />

          <InfoRow
            icon={
              coin.price_change_percentage_24h >= 0 ? (
                <TrendingUp sx={{ color: 'green' }} />
              ) : (
                <TrendingDown sx={{ color: 'red' }} />
              )
            }
            label="24h Change"
            value={`${coin.price_change_percentage_24h.toFixed(2)}%`}
            color={coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}
          />

          <InfoRow
            icon={<AccountBalanceWallet color="action" />}
            label="Market Cap"
            value={`$${coin.market_cap.toLocaleString()}`}
          />

          <InfoRow
            icon={<ShowChart color="secondary" />}
            label="High 24h"
            value={`$${coin.high_24h.toLocaleString()}`}
          />

          <InfoRow
            icon={<BarChart color="secondary" />}
            label="Low 24h"
            value={`$${coin.low_24h.toLocaleString()}`}
          />
        </Stack>
      </Box>
    </Modal>
  );
};

const InfoRow = ({ icon, label, value, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {icon}
    <Typography variant="body2" sx={{ flex: 1 }} color="text.secondary">
      {label}
    </Typography>
    <Typography
      variant="body1"
      fontWeight="bold"
      sx={{ color: color || 'text.primary' }}
    >
      {value}
    </Typography>
  </Box>
);

export default CoinDetailModal;
