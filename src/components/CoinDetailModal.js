import React from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
};

const CoinDetailModal = ({ open, handleClose, coin }) => {
    if (!coin) return null;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold">
                        {coin.name}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <img src={coin.image} alt={coin.name} height={50} style={{ margin: '16px 0' }} />

                <Typography>Current Price: ${coin.current_price.toLocaleString()}</Typography>
                <Typography>Market Cap: ${coin.market_cap.toLocaleString()}</Typography>
                <Typography>Volume: ${coin.total_volume.toLocaleString()}</Typography>
                <Typography>Symbol: {coin.symbol.toUpperCase()}</Typography>
                <Typography>Price Change 24h: {coin.price_change_percentage_24h.toFixed(2)}%</Typography>
            </Box>
        </Modal>
    );
};

export default CoinDetailModal;