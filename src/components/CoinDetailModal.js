import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    Tab,
    Tabs,
    Divider,
    Avatar,
    IconButton,
} from '@mui/material';
import { TrendingUp, TrendingDown, MonetizationOn, Info, AccessTime } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import CryptoContext from '../context/CryptoContext';
import { getCurrencySymbol } from '../utils/currencySymbol';

const InfoRow = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" mb={1}>
        <Box mr={1}>{icon}</Box>
        <Typography variant="body2" fontWeight="bold" mr={1}>{label}:</Typography>
        <Typography variant="body2" color="text.secondary">{value}</Typography>
    </Box>
);

const CoinDetailModal = ({ open, onClose, coin }) => {
    const theme = useTheme();
    const [tab, setTab] = React.useState(0);

    const {currency} = useContext(CryptoContext);
    const CSign = getCurrencySymbol(currency);
    
    if (!coin) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pr: 2
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={coin.image} alt={coin.name} />
                    <Typography variant="h6" fontWeight="bold">
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{ mb: 2 }}
                >
                    <Tab label="Overview" />
                    <Tab label="Market Stats" />
                    <Tab label="History" />
                </Tabs>

                <Divider sx={{ mb: 2 }} />

                {tab === 0 && (
                    <Box>
                        <InfoRow icon={<Info />} label="Current Price" value={`${CSign}${coin.current_price.toLocaleString()}`} />
                        <InfoRow icon={<TrendingUp />} label="24h Change" value={`${coin.price_change_percentage_24h.toFixed(2)}%`} />
                        <InfoRow icon={<MonetizationOn />} label="Market Cap" value={`${CSign}${coin.market_cap.toLocaleString()}`} />
                        <InfoRow icon={<MonetizationOn />} label="Volume" value={`${CSign}${coin.total_volume.toLocaleString()}`} />
                    </Box>
                )}

                {tab === 1 && (
                    <Box>
                        <InfoRow icon={<TrendingUp />} label="All Time High" value={`${CSign}${coin.ath.toLocaleString()}`} />
                        <InfoRow icon={<TrendingDown />} label="All Time Low" value={`${CSign}${coin.atl.toLocaleString()}`} />
                        <InfoRow icon={<MonetizationOn />} label="Total Supply" value={coin.total_supply || 'N/A'} />
                        <InfoRow icon={<MonetizationOn />} label="Circulating Supply" value={coin.circulating_supply || 'N/A'} />
                    </Box>
                )}

                {tab === 2 && (
                    <Box>
                        <InfoRow icon={<AccessTime />} label="ATH Date" value={new Date(coin.ath_date).toLocaleDateString()} />
                        <InfoRow icon={<AccessTime />} label="ATL Date" value={new Date(coin.atl_date).toLocaleDateString()} />
                        <InfoRow icon={<AccessTime />} label="Last Updated" value={new Date(coin.last_updated).toLocaleString()} />
                    </Box>
                )}

                {coin.description && coin.description.en && (
                    <Box mt={3}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Description:</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {coin.description.en.split('. ')[0]}.
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CoinDetailModal;
